interface VercelReq {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
}

interface VercelRes {
  status: (code: number) => {
    setHeader: (name: string, value: string) => void;
    send: (body: string) => void;
  };
}

function renderHtmlPage(title: string, message: string, success: boolean): string {
  const accent = success ? '#15803D' : '#7B1113';
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - Hồn Việt Culture</title>
</head>
<body style="margin:0; font-family: system-ui, -apple-system, sans-serif; background:#FDFBF7; color:#2C1E1A; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:20px;">
  <div style="max-width:480px; width:100%; background:#FFFFFF; border:2px solid #D4AF37; border-radius:20px; padding:32px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="width:56px; height:56px; border-radius:50%; background:${accent}; color:#FFFFFF; font-size:26px; line-height:56px; margin:0 auto 16px;">
      ${success ? '✓' : '!'}
    </div>
    <h1 style="font-size:22px; color:#7B1113; margin:0 0 10px;">${title}</h1>
    <p style="font-size:14px; color:#6B5B53; line-height:1.6; margin:0 0 24px;">${message}</p>
    <a href="https://hon-viet-culture.vercel.app" style="display:inline-block; background:#7B1113; color:#FFFFFF; text-decoration:none; padding:10px 20px; border-radius:10px; font-size:14px; font-weight:600;">
      Quay lại Hồn Việt Culture
    </a>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelReq, res: VercelRes) {
  const rawToken = req.query?.token;
  const rawAction = req.query?.action;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
  const action = Array.isArray(rawAction) ? rawAction[0] : rawAction || 'approve';

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    const html = renderHtmlPage(
      'Thiếu cấu hình server',
      'Vui lòng thêm SUPABASE_SERVICE_ROLE_KEY trong Vercel Environment Variables.',
      false
    );
    const r = res.status(500);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(html);
    return;
  }

  if (!token) {
    const html = renderHtmlPage(
      'Liên kết không hợp lệ',
      'Thiếu mã xác nhận lịch hẹn.',
      false
    );
    const r = res.status(400);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(html);
    return;
  }

  const nextStatus = action === 'reject' ? 'rejected' : 'confirmed';

  try {
    const updateResp = await fetch(
      `${supabaseUrl}/rest/v1/bookings?approval_token=eq.${encodeURIComponent(
        token
      )}&status=eq.pending`,
      {
        method: 'PATCH',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          status: nextStatus,
          approval_token: null,
        }),
      }
    );

    if (!updateResp.ok) {
      const errText = await updateResp.text();
      res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8');
      res
        .status(500)
        .send(renderHtmlPage('Lỗi hệ thống', errText, false));
      return;
    }

    const updatedRows = (await updateResp.json()) as Array<{
      workshop_name?: string;
      customer_name?: string;
      booking_date?: string;
      time_slot?: string;
    }>;

    if (!updatedRows || updatedRows.length === 0) {
      const r = res.status(404);
      r.setHeader('Content-Type', 'text/html; charset=utf-8');
      r.send(
        renderHtmlPage(
          'Liên kết đã được sử dụng hoặc hết hạn',
          'Lịch hẹn này đã được xử lý trước đó hoặc mã xác nhận không còn hiệu lực.',
          false
        )
      );
      return;
    }

    const bk = updatedRows[0];
    const title =
      nextStatus === 'confirmed'
        ? 'Đã đồng ý lịch hẹn thành công!'
        : 'Đã từ chối lịch hẹn';
    const msg =
      nextStatus === 'confirmed'
        ? `Lịch hẹn "${bk.workshop_name}" của khách ${bk.customer_name} (ngày ${bk.booking_date} lúc ${bk.time_slot}) đã được cập nhật sang trạng thái ĐÃ XÁC NHẬN.`
        : `Lịch hẹn "${bk.workshop_name}" của khách ${bk.customer_name} đã được chuyển sang trạng thái TỪ CHỐI.`;

    const r = res.status(200);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(renderHtmlPage(title, msg, nextStatus === 'confirmed'));
  } catch (err) {
    const r = res.status(500);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(
      renderHtmlPage(
        'Lỗi kết nối',
        err instanceof Error ? err.message : 'Không thể kết nối Supabase.',
        false
      )
    );
  }
}

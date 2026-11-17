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
  const accent = success ? '#15803D' : '#A3161A';
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - Hồn Việt Culture</title>
</head>
<body style="margin:0; font-family: system-ui, -apple-system, sans-serif; background:#FAF6EC; color:#2C1E1A; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:20px;">
  <div style="max-width:480px; width:100%; background:#FFFFFF; border:2px solid #D9A74A; border-radius:20px; padding:32px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="width:56px; height:56px; border-radius:50%; background:${accent}; color:#FFFFFF; font-size:26px; line-height:56px; margin:0 auto 16px;">
      ${success ? '✓' : '!'}
    </div>
    <h1 style="font-size:22px; color:#A3161A; margin:0 0 10px;">${title}</h1>
    <p style="font-size:14px; color:#6B5B53; line-height:1.6; margin:0 0 24px;">${message}</p>
    <a href="https://hon-viet-culture.vercel.app" style="display:inline-block; background:#A3161A; color:#FFFFFF; text-decoration:none; padding:10px 20px; border-radius:10px; font-size:14px; font-weight:600;">
      Quay lại Hồn Việt Culture
    </a>
  </div>
</body>
</html>`;
}

function formatDateVN(iso?: string): string {
  if (!iso || !iso.includes('-')) return iso || '';
  const [y, m, d] = iso.split('T')[0].split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export default async function handler(req: VercelReq, res: VercelRes) {
  // Bỏ qua HEAD prefetch từ trình duyệt / Gmail scanner
  if (req.method === 'HEAD') {
    const r = res.status(200);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send('');
    return;
  }

  const rawToken = req.query?.token;
  const rawAction = req.query?.action;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
  const action = Array.isArray(rawAction) ? rawAction[0] : rawAction || 'approve';

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    const r = res.status(500);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(
      renderHtmlPage(
        'Thiếu cấu hình server',
        'Vui lòng thêm SUPABASE_SERVICE_ROLE_KEY trong Vercel Environment Variables.',
        false
      )
    );
    return;
  }

  if (!token) {
    const r = res.status(400);
    r.setHeader('Content-Type', 'text/html; charset=utf-8');
    r.send(
      renderHtmlPage('Liên kết không hợp lệ', 'Thiếu mã xác nhận lịch hẹn.', false)
    );
    return;
  }

  const nextStatus = action === 'reject' ? 'rejected' : 'confirmed';

  try {
    // 1. Tìm bản ghi theo approval_token (không lọc status để xử lý thân thiện nếu đã duyệt)
    const findResp = await fetch(
      `${supabaseUrl}/rest/v1/bookings?approval_token=eq.${encodeURIComponent(
        token
      )}&select=id,status,workshop_name,customer_name,booking_date,time_slot`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      }
    );

    const rows = (await findResp.json()) as Array<{
      id: string;
      status: string;
      workshop_name?: string;
      customer_name?: string;
      booking_date?: string;
      time_slot?: string;
    }>;

    if (!Array.isArray(rows) || rows.length === 0) {
      const r = res.status(404);
      r.setHeader('Content-Type', 'text/html; charset=utf-8');
      r.send(
        renderHtmlPage(
          'Không tìm thấy lịch hẹn',
          'Lịch hẹn này không tồn tại hoặc mã xác nhận không hợp lệ.',
          false
        )
      );
      return;
    }

    const bk = rows[0];

    // Nếu đã xử lý trước đó rồi -> hiển thị thông báo rõ ràng
    if (bk.status === 'confirmed') {
      const r = res.status(200);
      r.setHeader('Content-Type', 'text/html; charset=utf-8');
      r.send(
        renderHtmlPage(
          'Lịch hẹn đã được xác nhận!',
          `Lịch hẹn "${bk.workshop_name}" của khách ${bk.customer_name} (ngày ${formatDateVN(
            bk.booking_date
          )} lúc ${bk.time_slot}) hiện đang ở trạng thái ĐÃ XÁC NHẬN.`,
          true
        )
      );
      return;
    }

    if (bk.status === 'rejected' || bk.status === 'cancelled') {
      const r = res.status(200);
      r.setHeader('Content-Type', 'text/html; charset=utf-8');
      r.send(
        renderHtmlPage(
          'Lịch hẹn đã được đóng trước đó',
          `Lịch hẹn "${bk.workshop_name}" của khách ${bk.customer_name} hiện đang ở trạng thái ${
            bk.status === 'rejected' ? 'TỪ CHỐI' : 'ĐÃ HỦY'
          }.`,
          false
        )
      );
      return;
    }

    // 2. Cập nhật trạng thái mới (giữ nguyên approval_token để nếu bấm lại vẫn xem được trạng thái)
    const updateResp = await fetch(
      `${supabaseUrl}/rest/v1/bookings?id=eq.${encodeURIComponent(bk.id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus }),
      }
    );

    if (!updateResp.ok) {
      const errText = await updateResp.text();
      const r = res.status(500);
      r.setHeader('Content-Type', 'text/html; charset=utf-8');
      r.send(renderHtmlPage('Lỗi cập nhật dữ liệu', errText, false));
      return;
    }

    const title =
      nextStatus === 'confirmed'
        ? 'Đã đồng ý lịch hẹn thành công!'
        : 'Đã từ chối lịch hẹn';
    const msg =
      nextStatus === 'confirmed'
        ? `Lịch hẹn "${bk.workshop_name}" của khách ${bk.customer_name} (ngày ${formatDateVN(
            bk.booking_date
          )} lúc ${bk.time_slot}) đã được cập nhật sang trạng thái ĐÃ XÁC NHẬN.`
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

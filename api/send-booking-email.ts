interface VercelReq {
  method?: string;
  body?: {
    bookingId?: string;
    workshopName?: string;
    date?: string;
    timeSlot?: string;
    guests?: number;
    customerName?: string;
    customerPhone?: string;
    approvalToken?: string;
  };
  headers?: Record<string, string | string[] | undefined>;
}

interface VercelRes {
  status: (code: number) => { json: (data: unknown) => void };
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!resendApiKey || !adminEmail) {
    return res.status(200).json({
      skipped: true,
      message: 'RESEND_API_KEY hoặc ADMIN_EMAIL chưa được cấu hình.',
    });
  }

  const {
    workshopName,
    date,
    timeSlot,
    guests,
    customerName,
    customerPhone,
    approvalToken,
  } = req.body || {};

  if (!approvalToken || !workshopName) {
    return res.status(400).json({ error: 'Thiếu thông tin lịch hẹn.' });
  }

  const hostHeader = req.headers?.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  const baseUrl =
    process.env.SITE_URL ||
    (host ? `https://${host}` : 'https://hon-viet-culture.vercel.app');

  const approveUrl = `${baseUrl}/api/confirm-booking?token=${encodeURIComponent(
    approvalToken
  )}&action=approve`;
  const rejectUrl = `${baseUrl}/api/confirm-booking?token=${encodeURIComponent(
    approvalToken
  )}&action=reject`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #FDFBF7; border: 1px solid #D4AF37; border-radius: 14px; overflow: hidden;">
      <div style="background: #7B1113; color: #FFFFFF; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 20px;">Hồn Việt Culture – Yêu cầu xác nhận lịch hẹn</h2>
      </div>
      <div style="padding: 24px; color: #2C1E1A; line-height: 1.6;">
        <p>Có khách hàng vừa đặt lịch trải nghiệm làng nghề mới:</p>
        <ul style="background: #FFFFFF; border: 1px solid #E5D4A1; border-radius: 10px; padding: 14px 20px; list-style: none; margin: 16px 0;">
          <li><strong>Workshop:</strong> ${workshopName}</li>
          <li><strong>Ngày &amp; Giờ:</strong> ${date} lúc ${timeSlot}</li>
          <li><strong>Số khách:</strong> ${guests} khách</li>
          <li><strong>Khách hàng:</strong> ${customerName}</li>
          <li><strong>Số điện thoại:</strong> ${customerPhone}</li>
        </ul>
        <div style="margin-top: 22px; display: flex; gap: 12px;">
          <a href="${approveUrl}" style="display: inline-block; background: #7B1113; color: #FFFFFF; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
            ✓ Đồng ý lịch hẹn
          </a>
          <a href="${rejectUrl}" style="display: inline-block; background: #FAF3E0; color: #7B1113; border: 1px solid #7B1113; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: bold;">
            Từ chối
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    const emailResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hon Viet Culture <onboarding@resend.dev>',
        to: [adminEmail],
        subject: `[Xác nhận lịch hẹn] ${workshopName} - ${customerName}`,
        html,
      }),
    });

    if (!emailResp.ok) {
      const errText = await emailResp.text();
      return res.status(502).json({ error: errText });
    }

    return res.status(200).json({ sent: true });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Lỗi gửi email',
    });
  }
}

import React from 'react';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-heritage-burgundyDark text-heritage-cream mt-16 border-t-4 border-heritage-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-heritage-gold mb-3">
            Hồn Việt Culture
          </h3>
          <p className="text-sm text-heritage-cream/85 leading-relaxed">
            <em>
              “Số hóa di sản, kết nối cộng đồng – Nâng tầm văn hóa Việt”
            </em>
            . Nền tảng số hóa di sản bảo tồn và lan tỏa nét đẹp văn hóa 5 tỉnh
            thành trọng điểm Đồng bằng sông Cửu Long: Cần Thơ, Vĩnh Long, Đồng
            Tháp, An Giang, Cà Mau.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-heritage-gold mb-3">
            Thông tin liên hệ
          </h4>
          <ul className="space-y-2 text-sm text-heritage-cream/85">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Hotline: 1900 6868 - 0909 123 456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Email: lienhe@honvietculture.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Website: www.honvietculture.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-heritage-gold shrink-0" />
              <span>Trụ sở: Quận Ninh Kiều, TP. Cần Thơ</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-heritage-gold mb-3">
            Pháp lý & Chính sách
          </h4>
          <p className="text-sm text-heritage-cream/85 leading-relaxed mb-2">
            <strong>Mã số thuế (MST):</strong> 1801234567 – Sở Kế hoạch &amp;
            Đầu tư TP. Cần Thơ cấp.
          </p>
          <p className="text-xs text-heritage-cream/75 leading-relaxed">
            Chính sách đặt lịch trải nghiệm: Hỗ trợ hủy trực tuyến miễn phí
            trước ngày diễn ra trải nghiệm tối thiểu 5 ngày (120 giờ).
          </p>
        </div>
      </div>

      <div className="border-t border-heritage-gold/25 py-4 text-center text-xs text-heritage-cream/75 px-4">
        © 2026 Hồn Việt Culture - Nền tảng số hóa văn hóa di sản Đồng bằng sông
        Cửu Long.
      </div>
    </footer>
  );
};

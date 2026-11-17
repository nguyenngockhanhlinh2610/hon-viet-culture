import { Province } from '../types';

export const PROVINCES: Province[] = [
  {
    id: 'can-tho',
    name: 'TP. Cần Thơ',
    shortTitle: 'Thủ phủ Tây Đô',
    tagline: 'Trung tâm kinh tế, văn hóa Đồng bằng sông Cửu Long',
    description:
      'Trung tâm kinh tế, văn hóa, y tế và giáo dục của vùng Đồng bằng sông Cửu Long. Nổi tiếng với hệ thống sông rạch chằng chịt, bến Ninh Kiều và nếp sống văn hóa sông nước miệt vườn thanh bình.',
    highlights: ['Chợ nổi Cái Răng', 'Nhà cổ Bình Thủy', 'Bến Ninh Kiều', 'Chùa Ông'],
    bestSeason: 'Quanh năm (rộn ràng nhất tháng Chạp – tháng 4 Âm lịch)',
    image: 'https://baocantho.com.vn/image/fckeditor/upload/2025/20250927/images/T3a-1-BSS.webp',
    coordinates: { lat: 10.0371, lng: 105.7828 },
  },
  {
    id: 'vinh-long',
    name: 'Tỉnh Vĩnh Long',
    shortTitle: 'Vương quốc Gốm Đỏ',
    tagline: 'Tỉnh ở trung tâm đồng bằng giữa hai dòng Tiền – Hậu',
    description:
      'Tỉnh ở trung tâm đồng bằng, kẹp giữa hai sông Tiền và sông Hậu. Nổi tiếng với mạng lưới sông rạch, những cù lao trù phú ngợp trái cây và làng nghề gốm gạch đỏ truyền thống dọc sông Cổ Chiên.',
    highlights: ['Làng gốm đỏ Mang Thít', 'Cù lao An Bình', 'Chùa Tiên Châu', 'Bưởi Năm Roi'],
    bestSeason: 'Mùa trái cây (T5 – T8) & mùa khô (T12 – T4)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6-XNSFc-x73TQyokW5nWEgcVgQTlKndU4-fcRSVoDQ&s=10',
    coordinates: { lat: 10.2537, lng: 105.9722 },
  },
  {
    id: 'dong-thap',
    name: 'Tỉnh Đồng Tháp',
    shortTitle: 'Đất Sen Hồng',
    tagline: 'Vùng đất Sen Hồng thuần khiết',
    description:
      'Vùng đất Sen Hồng với cảnh quan Đồng Tháp Mười hoang sơ, Vườn Quốc gia Tràm Chim, Di tích lịch sử Xẻo Quýt, làng hoa kiểng Sa Đéc lâu đời và nét ẩm thực mùa nước nổi phong phú.',
    highlights: ['VQG Tràm Chim', 'Làng hoa Sa Đéc', 'Nhà cổ Huỳnh Thủy Lê', 'Nem Lai Vung'],
    bestSeason: 'Mùa nước nổi (T9 – T11) & giáp Tết Nguyên Đán',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7rZcFCQIr0oBMCnY05__Ns7PoePYbrrcabKDOhy1MQ&s=10',
    coordinates: { lat: 10.4602, lng: 105.6331 },
  },
  {
    id: 'an-giang',
    name: 'Tỉnh An Giang',
    shortTitle: 'Miền Thất Sơn Huyền Bí',
    tagline: 'Giao thoa văn hóa Kinh – Khmer – Chăm – Hoa',
    description:
      'Tỉnh biên giới có cả đồng bằng và vùng núi Thất Sơn hùng vĩ. Nơi giao thoa văn hóa độc đáo giữa 4 dân tộc Kinh, Khmer, Chăm, Hoa cùng các di tích tâm linh linh thiêng bậc nhất Tây Nam Bộ.',
    highlights: ['Miếu Bà Chúa Xứ', 'Rừng tràm Trà Sư', 'Núi Cấm', 'Di tích Óc Eo - Ba Thê'],
    bestSeason: 'Tháng 4 ÂL (Vía Bà) & mùa nước nổi (T9 – T11)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTWcqfacRbk-WEUo4uyews_jzy2Do5rwzpOXGXkjImg&s=10',
    coordinates: { lat: 10.5216, lng: 105.1259 },
  },
  {
    id: 'ca-mau',
    name: 'Tỉnh Cà Mau',
    shortTitle: 'Đất Mũi Cực Nam',
    tagline: 'Địa đầu cực Nam của Tổ quốc',
    description:
      'Địa đầu cực Nam của Tổ quốc với 3 mặt giáp biển, sở hữu Khu dự trữ sinh quyển thế giới Vườn Quốc gia Mũi Cà Mau và U Minh Hạ với hệ sinh thái rừng ngập mặn đước và mắm ngút ngàn.',
    highlights: ['Mũi Cà Mau GPS 0001', 'VQG U Minh Hạ', 'Hòn Đá Bạc', 'Cua Cà Mau'],
    bestSeason: 'Mùa khô (T12 – T4) thuận tiện đi rừng & gác kèo ong',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsHLbD9OhaAqXWD6afWQ8df8DSkty52BvypnwmJfHTA&s=10',
    coordinates: { lat: 9.1769, lng: 105.1524 },
  },
];

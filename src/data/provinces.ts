import { Province } from '../types';

export const PROVINCES: Province[] = [
  {
    id: 'can-tho',
    name: 'Thành phố Cần Thơ',
    shortTitle: 'Thủ phủ Tây Đô',
    tagline: 'Đô thị sông nước trung tâm miền Tây',
    description:
      'Đô thị sông nước trung tâm miền Tây, thủ phủ Tây Đô với chợ nổi Cái Răng tấp nập bình minh, nhà cổ Bình Thủy tráng lệ hơn 150 năm tuổi và bến Ninh Kiều thơ mộng.',
    highlights: ['Chợ nổi Cái Răng', 'Nhà cổ Bình Thủy', 'Bến Ninh Kiều', 'Bánh tét lá cẩm'],
    bestSeason: 'Quanh năm (rộn ràng nhất tháng Chạp – tháng 4 Âm lịch)',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 10.0452, lng: 105.7469 },
  },
  {
    id: 'vinh-long',
    name: 'Tỉnh Vĩnh Long',
    shortTitle: 'Vương quốc Gốm Đỏ',
    tagline: 'Xứ sở cù lao giữa hai dòng Tiền – Hậu',
    description:
      'Xứ sở cù lao trù phú giữa hai dòng sông Tiền - sông Hậu, nổi danh là Vương quốc gốm đỏ Mang Thít trăm năm rực rỡ và những vườn cây ăn trái quanh năm trĩu quả.',
    highlights: ['Lò gạch Mang Thít', 'Văn Thánh Miếu', 'Cù lao An Bình', 'Bưởi Năm Roi'],
    bestSeason: 'Mùa trái cây (T5 – T8) & mùa khô (T12 – T4)',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 10.2396, lng: 105.9572 },
  },
  {
    id: 'dong-thap',
    name: 'Tỉnh Đồng Tháp',
    shortTitle: 'Đất Sen Hồng',
    tagline: 'Thuần khiết như hồn sen Tháp Mười',
    description:
      'Vùng đất sen hồng thuần khiết với hệ sinh thái đất ngập nước Tràm Chim nguyên sơ, làng hoa Sa Đéc trăm hoa khoe sắc và những làng nghề dệt chiếu, dệt choàng lịch sử.',
    highlights: ['VQG Tràm Chim', 'Làng hoa Sa Đéc', 'Khu di tích Gò Tháp', 'Nem Lai Vung'],
    bestSeason: 'Mùa nước nổi (T9 – T11) & giáp Tết Nguyên Đán',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 10.4938, lng: 105.6882 },
  },
  {
    id: 'an-giang',
    name: 'Tỉnh An Giang',
    shortTitle: 'Miền Thất Sơn Huyền Bí',
    tagline: 'Hội tụ văn hóa Kinh – Chăm – Khmer – Hoa',
    description:
      'Miền biên viễn huyền bí, nơi hội tụ văn hóa đa tộc người, dãy Thất Sơn hùng vĩ, miếu Bà Chúa Xứ linh thiêng, di chỉ Óc Eo cổ đại và rừng tràm Trà Sư xanh ngát.',
    highlights: ['Miếu Bà Chúa Xứ', 'Rừng tràm Trà Sư', 'Hội Đua bò Bảy Núi', 'Mắm Châu Đốc'],
    bestSeason: 'Tháng 4 ÂL (Vía Bà) & mùa nước nổi (T9 – T11)',
    image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 10.5216, lng: 105.1259 },
  },
  {
    id: 'ca-mau',
    name: 'Tỉnh Cà Mau',
    shortTitle: 'Đất Mũi Cực Nam',
    tagline: 'Rừng đước ôm biển, huyền thoại U Minh',
    description:
      'Điểm cực Nam Tổ quốc nơi rừng ngập mặn ôm trọn bờ biển, xứ sở rừng U Minh bạt ngàn, di sản gác kèo ong rừng tràm và văn hóa ẩm thực thủy hải sản Đất Mũi trứ danh.',
    highlights: ['Cột cờ Mũi Cà Mau', 'Rừng U Minh Hạ', 'Hòn Đá Bạc', 'Cua Năm Căn'],
    bestSeason: 'Mùa khô (T12 – T4) thuận tiện đi rừng & gác kèo ong',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 9.1768, lng: 105.1524 },
  },
];

import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-cay-beo-cai-rang',
    slug: 'chuyen-cay-beo-tren-cho-noi-cai-rang',
    provinceId: 'can-tho',
    title: 'Chuyện “cây bẹo” và nhịp sống bình minh trên Chợ nổi Cái Răng',
    category: 'Câu chuyện Di sản',
    author: 'Ban Biên Tập Hồn Việt',
    publishedAt: '10/11/2026',
    readMinutes: 4,
    summary:
      'Vì sao giữa tiếng máy ghe nổ giòn lúc 5 giờ sáng, người thương hồ miền Tây vẫn nhận ra nhau chỉ qua một cây sào tre?',
    content: [
      'Khi sương sớm còn bảng lảng trên sông Cần Thơ, hàng trăm chiếc ghe bầu chở đầy khóm, dưa hấu, bí đỏ đã neo đậu san sát tạo nên bức tranh giao thương rực rỡ bậc nhất Tây Nam Bộ.',
      'Giữa không gian mênh mông của sông nước và tiếng máy tàu, việc rao bán bằng lời gần như bất khả thi. Từ đó, người dân sáng tạo ra "cây bẹo" – cây sào tre dựng thẳng ở mũi ghe, treo đúng thứ nông sản mà ghe đang bán.',
      'Thú vị hơn, cây bẹo còn tuân theo luật ngầm "treo gì bán nấy" nhưng cũng có ngoại lệ: treo lá dừa nghĩa là bán ghe, còn treo tấm vải hay chiếc áo cũ có khi là ghe phục vụ cà phê, hủ tiếu lắc cho khách thương hồ.',
    ],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
    tags: ['Cần Thơ', 'Chợ nổi', 'Văn hóa sông nước'],
  },
  {
    id: 'blog-gom-do-mang-thit',
    slug: 'vuong-quoc-gom-do-mang-thit-hoi-uc-tram-nam',
    provinceId: 'vinh-long',
    title: 'Vương quốc Gốm đỏ Mang Thít: Giữ lửa lò gạch trăm năm bên kênh Thầy Cai',
    category: 'Chân dung Nghệ nhân',
    author: 'Minh Khang',
    publishedAt: '05/11/2026',
    readMinutes: 5,
    summary:
      'Hàng trăm ngọn tháp gạch nung đỏ rực dưới nắng chiều Vĩnh Long đang được đánh thức thành di sản đương đại sống động.',
    content: [
      'Dọc theo dòng kênh Thầy Cai ở huyện Mang Thít, những lò gạch hình tháp tròn cao vút nối tiếp nhau tạo nên khung cảnh kỳ vĩ hiếm có tại Việt Nam.',
      'Đất sét phù sa sông Cổ Chiên qua đôi tay nhào nặn của nghệ nhân và ngọn lửa trấu âm ỉ nhiều ngày cho ra sắc đỏ cam tự nhiên, không phai màu theo thời gian.',
      'Ngày nay, du khách đến Mang Thít không chỉ chụp ảnh bên những lò gạch cổ mà còn có thể ngồi bàn xoay tự tay chuốt bình gốm nhỏ mang dấu ấn riêng của mình.',
    ],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
    tags: ['Vĩnh Long', 'Gốm đỏ', 'Làng nghề'],
  },
  {
    id: 'blog-mua-nuoc-noi-tram-chim',
    slug: 'mua-nuoc-noi-dong-thap-va-vu-dieu-seu-dau-do',
    provinceId: 'dong-thap',
    title: 'Mùa nước nổi Đồng Tháp: Đi tìm mùa sen và vũ điệu Sếu đầu đỏ',
    category: 'Cẩm nang Du lịch',
    author: 'Thảo Nguyên',
    publishedAt: '28/10/2026',
    readMinutes: 4,
    summary:
      'Từ tháng 9 đến tháng 11 dương lịch là khoảng thời gian đẹp nhất để cảm nhận trọn vẹn sức sống của vùng Đồng Tháp Mười.',
    content: [
      'Mỗi độ thu về, nước từ thượng nguồn sông Mê Kông tràn vào các cánh đồng Đồng Tháp mang theo phù sa, cá linh non và bông điên điển vàng rực.',
      'Tại Vườn quốc gia Tràm Chim, hệ sinh thái đất ngập nước bừng tỉnh với thảm sen súng và hàng trăm loài chim nước tìm về làm tổ.',
      'Kết hợp chuyến đi với Làng hoa Sa Đéc và Làng dệt choàng Long Khánh A, bạn sẽ có một hành trình 2 ngày 1 đêm đậm chất Đất Sen Hồng.',
    ],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    tags: ['Đồng Tháp', 'Mùa nước nổi', 'Tràm Chim'],
  },
  {
    id: 'blog-giao-thoa-van-hoa-an-giang',
    slug: 'an-giang-noi-hoi-tu-bon-dong-chay-van-hoa',
    provinceId: 'an-giang',
    title: 'An Giang: Nơi hội tụ bốn dòng chảy văn hóa Kinh – Chăm – Khmer – Hoa',
    category: 'Câu chuyện Di sản',
    author: 'Ban Biên Tập Hồn Việt',
    publishedAt: '19/10/2026',
    readMinutes: 6,
    summary:
      'Từ Miếu Bà Chúa Xứ Núi Sam đến Thánh đường Mubarak Châu Giang và Hội Đua bò Bảy Núi đầy sắc màu.',
    content: [
      'Hiếm có vùng đất nào ở phương Nam lại sở hữu sự giao thoa văn hóa đa tộc người hài hòa và sâu sắc như An Giang.',
      'Ở Châu Đốc, chỉ cần qua một chuyến phà nhỏ sang xóm Chăm Châu Giang, bạn đã bước vào không gian yên bình của những ngôi nhà sàn gỗ và khung cửi dệt thổ cẩm truyền thống.',
      'Xuôi về vùng Tri Tôn – Tịnh Biên, tiếng nhạc ngũ âm và những cặp bò đua sải bước trên ruộng sình dịp lễ Dolta lại khắc họa sức sống mãnh liệt của đồng bào Khmer.',
    ],
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80',
    tags: ['An Giang', 'Đa văn hóa', 'Chăm', 'Khmer'],
  },
  {
    id: 'blog-gac-keo-ong-u-minh',
    slug: 'nghe-gac-keo-ong-di-san-giua-rung-tram-u-minh-ha',
    provinceId: 'ca-mau',
    title: 'Nghề gác kèo ong: Di sản sống giữa rừng tràm U Minh Hạ',
    category: 'Chân dung Nghệ nhân',
    author: 'Hoàng Nam',
    publishedAt: '12/10/2026',
    readMinutes: 5,
    summary:
      'Không nuôi nhốt, người thợ rừng Cà Mau "mời" ong mật làm tổ bằng sự am hiểu hướng gió, ánh nắng và mùa hoa tràm.',
    content: [
      'Gác kèo ong là di sản văn hóa phi vật thể Quốc gia độc đáo của vùng rừng ngập mặn U Minh Hạ. Người thợ chọn thân cây tràm già làm kèo, gác nghiêng đón hướng nắng sáng.',
      'Khi mùa hoa tràm nở trắng rừng, đàn ong mật tự nhiên tìm đến đóng sáp trên kèo và tạo nên những giọt mật vàng óng sánh đặc.',
      'Người thợ rừng chỉ cắt phần bầu mật mà giữ lại phần sáp non để đàn ong tiếp tục sinh sôi – một triết lý ứng xử hài hòa với thiên nhiên của người Đất Mũi.',
    ],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    tags: ['Cà Mau', 'U Minh Hạ', 'Gác kèo ong'],
  },
];

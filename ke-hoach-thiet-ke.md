# KẾ HOẠCH THIẾT KẾ WEBSITE: HỒN VIỆT CULTURE

> **Tài liệu tham khảo:** Bản prototype tương tác *Hồn Việt Culture*  
> **Phạm vi:** Nền tảng số hóa di sản và quảng bá văn hóa 5 tỉnh/thành trọng điểm Đồng bằng sông Cửu Long (Cần Thơ, Vĩnh Long, Đồng Tháp, An Giang, Cà Mau).

---

## 1. TỔNG QUAN DỰ ÁN & ĐỊNH VỊ THƯƠNG HIỆU

- **Tên thương hiệu:** Hồn Việt Culture
- **Slogan:** *"Số hóa di sản, kết nối cộng đồng – Nâng tầm văn hóa Việt"*
- **Sứ mệnh:**
  - Bảo tồn, số hóa và lan tỏa nét đẹp di sản vật thể & phi vật thể vùng Tây Nam Bộ.
  - Kết nối thế hệ trẻ với văn hóa bản địa thông qua trải nghiệm tương tác và gamification.
  - Hỗ trợ nghệ nhân làng nghề địa phương quảng bá sản phẩm và tiếp cận du khách đặt lịch trải nghiệm trực tiếp.

---

## 2. HỆ THỐNG NHẬN DIỆN THỊ GIÁC (VISUAL DESIGN SYSTEM)

### 2.1. Bảng màu (Color Palette)
| Vai trò | Tên màu | Mã màu (Hex) | Ý nghĩa & Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Chủ đạo (Primary)** | Đỏ thẫm truyền thống (Heritage Burgundy) | `#7B1113` / `#800000` | Hồn cốt văn hóa, gạch nung gốm đỏ Mang Thít, sắc lễ hội Nam Bộ. Dùng cho Header, CTA chính, điểm nhấn tiêu đề. |
| **Phụ (Secondary)** | Vàng đồng / Hoàng thổ (Warm Gold) | `#D4AF37` / `#E5A93C` | Hạt lúa phù sa, nắng phương Nam, sự thịnh vượng. Dùng cho viền huy hiệu, icon, trạng thái active, gamification. |
| **Nền (Background)** | Kem vàng nhạt (Paper Cream) | `#FDFBF7` / `#FAF3E0` | Gợi cảm giác giấy điệp, giấy dó mộc mạc, trang nhã, dễ đọc lâu. |
| **Chữ chính (Text)** | Nâu than / Đen mực | `#2C1E1A` / `#1F2937` | Đảm bảo độ tương phản cao (WCAG AA+) trên nền kem. |
| **Chữ phụ (Muted)** | Nâu xám ấm | `#6B5B53` | Mô tả phụ, metadata, chú thích ảnh. |

### 2.2. Hệ thống chữ viết (Typography)
- **Tiêu đề (Headings):** Font có chân (Serif) mang nét cổ điển, trang trọng (ví dụ: *Playfair Display*, *Merriweather* hoặc *Noto Serif* hỗ trợ đầy đủ dấu tiếng Việt).
- **Nội dung (Body & UI):** Font không chân (Sans-serif) hiện đại, rõ nét trên mọi kích thước màn hình (ví dụ: *Be Vietnam Pro* hoặc *Inter*).

### 2.3. Ngôn ngữ thiết kế & Họa tiết
- **Họa tiết bản địa:** Lồng ghép tinh tế hoa văn Trống đồng Đông Sơn, đường viền gốm đỏ, họa tiết lá sen/sông nước ở các dải phân cách (section dividers) và huy hiệu.
- **Thẻ nội dung (Cards):** Bo góc mềm (`12px–16px`), đổ bóng nhẹ ấm, hiệu ứng hover nâng nhẹ (`translateY`) kèm viền vàng đồng.
- **Responsive:** Thiết kế Mobile-first, hiển thị mượt mà trên điện thoại, máy tính bảng và desktop.

---

## 3. KIẾN TRÚC THÔNG TIN & ĐIỀU HƯỚNG (IA & NAVIGATION)

### 3.1. Thanh đầu trang (Header Bar)
- **Trái:** Logo Hồn Việt Culture (biểu tượng Trống Đồng / Hoa văn Đông Sơn) + Tên thương hiệu.
- **Giữa / Trên cùng (Gamification Banner):** Thanh thông báo nổi bật: *"Bạn đã sẵn sàng mở khóa 10 dấu ấn thất truyền và rinh Cúp Phượt Thủ Miền Tây? [Hộ Chiếu Săn Dấu Hồn Việt 0/10 →]"*.
- **Phải:**
  - Biểu tượng Trái tim Yêu thích kèm bộ đếm số lượng đã lưu (ví dụ: `0`).
  - Nút Tài khoản / Chat AI nhanh.
  - Nút Hamburger Menu mở Drawer điều hướng (trên mobile) hoặc thanh menu ngang gọn gàng (trên desktop).

### 3.2. Danh mục Menu chính (9 mục)
1. 🏠 **Trang chủ**
2. 🏛️ **Tỉnh / Thành phố** (5 tỉnh ĐBSCL)
3. 🧭 **Khám phá** (Di tích & Danh thắng)
4. 🏮 **Lễ hội Truyền thống**
5. 🍲 **Đặc sản Vùng miền**
6. 🎨 **Trải nghiệm** (Thủ công mỹ nghệ)
7. 🛂 **Hành Trình Di Sản – Hộ Chiếu Săn Dấu** (Gamification)
8. ❤️ **Danh sách yêu thích** (Personal Collection)
9. 👤 **Tài khoản cá nhân & Chat AI**

---

## 4. THIẾT KẾ CHI TIẾT CÁC PHÂN HỆ (10 PHÂN HỆ)

### Phân hệ 1: Trang chủ (Homepage)
- **Hero Banner:**
  - Tiêu đề: *"Hồn Việt Culture - Nơi Di Sản Giao Hòa Cùng Nhịp Sống Hiện Đại"*.
  - Mô tả ngắn về nền tảng tương tác số hóa văn hóa Tây Nam Bộ qua 5 tỉnh ĐBSCL.
  - CTA chính: Khám phá ngay / Mở Hộ chiếu Săn Dấu.
- **Sứ mệnh & Giới thiệu nền tảng:** Hai trụ cột chính (Kết nối thế hệ trẻ với di sản vật thể/phi vật thể & Hỗ trợ nghệ nhân làng nghề).
- **Bản đồ / Danh thiếp 5 tỉnh tương tác:**
  - Hiển thị trực quan 5 tỉnh: **Cần Thơ, Vĩnh Long, Đồng Tháp, An Giang, Cà Mau**.
  - Nút *"Khám phá tỉnh"* mở **Pop-up/Modal toàn cảnh** gồm 4 tab: `Di tích`, `Lễ hội`, `Đặc sản`, `Làng nghề`.
- **Các khối nội dung nổi bật (Featured Highlights):**
  - Di tích & danh thắng tiêu biểu.
  - Trải nghiệm làng nghề độc đáo.
  - Lễ hội truyền thống theo mùa.
  - Góc đánh giá & chia sẻ từ cộng đồng du khách.

### Phân hệ 2: 5 Tỉnh / Thành phố trọng điểm
Trang tổng quan và hồ sơ văn hóa từng địa phương:
1. **TP. Cần Thơ:** Đô thị sông nước Tây Đô (Chợ nổi Cái Răng, Nhà cổ Bình Thủy, Bến Ninh Kiều).
2. **Tỉnh Vĩnh Long:** Xứ sở cù lao giữa sông Tiền – sông Hậu, Vương quốc gốm đỏ Mang Thít, vườn cây ăn trái.
3. **Tỉnh Đồng Tháp:** Đất sen hồng (Tràm Chim, Làng hoa Sa Đéc, nghề dệt chiếu, dệt choàng).
4. **Tỉnh An Giang:** Miền biên viễn đa tộc người Kinh – Chăm – Khmer – Hoa (Thất Sơn, Miếu Bà Chúa Xứ, Rừng tràm Trà Sư).
5. **Tỉnh Cà Mau:** Điểm cực Nam Tổ quốc (Rừng ngập mặn, U Minh Hạ, gác kèo ong, thủy hải sản Đất Mũi).

### Phân hệ 3: Khám phá – Di tích & Danh thắng (20 địa điểm)
- **Tính năng:** Bộ lọc nhanh theo 5 tỉnh thành, tìm kiếm từ khóa, nút lưu yêu thích (`❤️`), trang/modal chi tiết địa điểm.
- **Dữ liệu 20 địa điểm (4 địa điểm/tỉnh):**
  - **Cần Thơ:** Chợ nổi Cái Răng, Nhà cổ Bình Thủy, Thiền viện Trúc Lâm Phương Nam, Bến Ninh Kiều & Cầu Tình Yêu.
  - **Vĩnh Long:** Vương quốc gốm đỏ Mang Thít, Văn Thánh Miếu Vĩnh Long, Cù lao An Bình, Chùa Tiên Châu.
  - **Đồng Tháp:** Vườn quốc gia Tràm Chim, Khu di tích Xẻo Quýt, Làng hoa Sa Đéc, Khu di tích Gò Tháp.
  - **An Giang:** Miếu Bà Chúa Xứ Núi Sam, Rừng tràm Trà Sư, Khu di tích khảo cổ Óc Eo - Ba Thê, Thánh đường Hồi giáo Mubarak.
  - **Cà Mau:** Cột cờ Hà Nội tại Mũi Cà Mau, Vườn quốc gia Mũi Cà Mau, Vườn quốc gia U Minh Hạ, Hòn Đá Bạc.

### Phân hệ 4: Lễ hội Truyền thống (11 đại lễ)
- **Tính năng:** Lọc theo tỉnh/tháng Âm lịch, thẻ thông tin thời gian – địa điểm – ý nghĩa văn hóa, nút lưu yêu thích.
- **Danh sách 11 lễ hội:**
  1. Lễ hội Chùa Bà Núi Sam (An Giang)
  2. Hội Đua bò Bảy Núi (An Giang)
  3. Lễ hội Sen Đồng Tháp (Đồng Tháp)
  4. Lễ giỗ Cụ Phó bảng Nguyễn Sinh Sắc (Đồng Tháp)
  5. Lễ hội Nghinh Ông Sông Đốc (Cà Mau)
  6. Lễ hội Bánh dân gian Nam Bộ (Cần Thơ)
  7. Lễ hội Kỳ Yên đình Bình Thủy (Cần Thơ)
  8. Lễ hội Lăng Ông Tiền quân Thống chế Điều bát Nguyễn Văn Tồn (Vĩnh Long)
  9. Lễ hội Cua Cà Mau (Cà Mau)
  10. Lễ hội Ok Om Bok (An Giang / Vĩnh Long)
  11. Tết Chol Chnam Thmay (Đồng bào Khmer 5 tỉnh)

### Phân hệ 5: Đặc sản Vùng miền (26 món ẩm thực & sản vật)
- **Tính năng:** Lọc theo tỉnh, phân loại món ăn/quà tặng, mô tả hương vị & nguồn gốc, nút lưu yêu thích.
- **Phân bổ dữ liệu:**
  - **Cần Thơ (5):** Bánh tét lá cẩm, Bánh xèo củ hủ dừa, Vịt nấu chao, Nem nướng Cái Răng, Dâu Hạ Châu.
  - **Vĩnh Long (5):** Khoai lang Bình Tân, Bưởi Năm Roi Bình Minh, Cam sành Tam Bình, Thanh trà ngọt Bình Minh, Cá tai tượng chiên xù.
  - **Đồng Tháp (5):** Nem Lai Vung, Bánh phồng tôm Sa Giang, Hủ tiếu Sa Đéc, Sen Tháp Mười (củ, ngó, hạt), Xoài cát Chu Cao Lãnh.
  - **An Giang (6):** Mắm Châu Đốc, Đường thốt nốt Bảy Núi, Bò bảy món Núi Sam, Bánh bò thốt nốt, Tung lò mò (Lạp xưởng bò Chăm), Cốm dẹp An Giang.
  - **Cà Mau (5):** Cua Năm Căn, Tôm khô Rạch Gốc, Mật ong rừng U Minh Hạ, Ba khía Rạch Gốc, Lẩu mắm U Minh.

### Phân hệ 6: Trải nghiệm Làng nghề Thủ công Mỹ nghệ (10 Workshop)
- **Tính năng:** Card trải nghiệm kèm 2 hành động chính: **"Xem chi tiết"** (quy trình, địa điểm, nghệ nhân) và **"Đặt lịch"** (chọn ngày, giờ, số lượng khách).
- **Danh sách 10 workshop:**
  1. Làm bánh tráng thủ công Thuận Hưng (Cần Thơ)
  2. Trải nghiệm đan lát ngư cụ Thới Long (Cần Thơ)
  3. Tự tay chuốt gốm đỏ tại Mang Thít (Vĩnh Long)
  4. Đan thủ công mỹ nghệ từ cây lục bình (Vĩnh Long)
  5. Dệt khăn rằn tại Làng Dệt Choàng (Đồng Tháp)
  6. Dệt chiếu thủ công Làng nghề Định Yên (Đồng Tháp)
  7. Dệt thổ cẩm tại Làng Chăm Châu Giang (An Giang)
  8. Chạm khắc gỗ mỹ nghệ Làng mộc Chợ Thủ (An Giang)
  9. Trải nghiệm gác kèo ong U Minh Hạ (Cà Mau)
  10. Chế tác đũa đước Cà Mau (Cà Mau)

### Phân hệ 7: Gamification – Hộ Chiếu Săn Dấu Hồn Việt
- **Cơ chế:**
  - Hiển thị lưới **10 dấu ấn thất truyền** tương ứng với các di sản & làng nghề tiêu biểu tại 5 tỉnh.
  - Thanh tiến độ trực quan (`0/10 dấu ấn` → `10/10 dấu ấn`).
  - Trạng thái mỗi dấu ấn: *Chưa mở khóa (mờ/khóa)* ↔ *Đã mở khóa (đóng dấu mộc đỏ/vàng rực rỡ)*.
  - Phần thưởng hoàn thành: **Cúp Phượt Thủ Miền Tây** & Huy hiệu Danh dự số hóa.
  - Yêu cầu đăng nhập tài khoản cá nhân để lưu giữ tiến độ và chứng nhận số.

### Phân hệ 8: Danh sách Yêu thích (Collections)
- Lưu trữ cá nhân các mục người dùng đã nhấn trái tim.
- Bộ lọc 5 nhóm: `Tất cả`, `🏛️ Khám phá`, `🏮 Lễ hội`, `🍲 Đặc sản`, `🎨 Trải nghiệm`.
- Trạng thái rỗng (Empty state) thân thiện kèm nút gợi ý quay lại khám phá.

### Phân hệ 9: Tài khoản cá nhân & Trợ lý AI Hồn Việt Culture
1. **Quản lý Tài khoản:**
   - Đăng nhập (Email/SĐT + Mật khẩu).
   - Đăng ký mới (Họ tên, Email/SĐT, Mật khẩu).
   - Quản lý lịch hẹn trải nghiệm làng nghề đã đặt.
   - **Quy tắc nghiệp vụ (Business Rule):** Hiển thị rõ và kiểm tra điều kiện **chính sách hủy lịch hẹn** — *chỉ được phép hủy trực tuyến trước ngày diễn ra trải nghiệm từ 5 đến 7 ngày trở lên; lịch cận ngày khóa nút hủy trực tuyến*.
2. **Trợ lý AI Hồn Việt Culture (AI Heritage Assistant):**
   - Khung chat tương tác nổi (Floating Widget hoặc trang riêng).
   - Tích hợp sẵn các nút gợi ý (Quick Prompts): *"Lễ hội An Giang diễn ra khi nào?"*, *"Đặc sản Cà Mau là gì?"*, *"Cách đặt lịch chuốt gốm Mang Thít"*.
   - Tra cứu và gợi ý lịch trình dựa trên bộ dữ liệu 5 tỉnh.

### Phân hệ 10: Chân trang (Footer)
- Tóm tắt sứ mệnh & phạm vi 5 tỉnh ĐBSCL.
- Thông tin liên hệ:
  - Hotline: `1900 6868` – `0909 123 456`
  - Email: `lienhe@honvietculture.vn`
  - Website: `www.honvietculture.vn`
  - Trụ sở: Quận Ninh Kiều, TP. Cần Thơ
  - MST: `1801234567` – Sở Kế hoạch & Đầu tư TP. Cần Thơ cấp
  - Bản quyền: `© 2026 Hồn Việt Culture - Nền tảng số hóa văn hóa di sản Đồng bằng sông Cửu Long.`

---

## 5. KIẾN TRÚC KỸ THUẬT & MÔ HÌNH DỮ LIỆU ĐỀ XUẤT

### 5.1. Công nghệ đề xuất (Tech Stack)
- **Frontend:** React (Vite hoặc Next.js) + TypeScript / JavaScript.
- **Styling:** Tailwind CSS cấu hình sẵn Design Tokens (màu `#7B1113`, `#D4AF37`, `#FDFBF7` và font Serif/Sans-serif).
- **Icons & Animation:** `lucide-react` cho hệ thống icon đồng bộ, CSS transitions / `framer-motion` cho hiệu ứng đóng dấu hộ chiếu và mở pop-up tỉnh.
- **Quản lý trạng thái & Lưu trữ (Giai đoạn MVP):** React Context / Zustand kết hợp `localStorage` để lưu danh sách Yêu thích, tiến độ Hộ chiếu 10 dấu ấn, tài khoản demo và lịch đặt workshop. (Có thể nâng cấp kết nối Backend REST/Firebase/Supabase ở giai đoạn sau).

### 5.2. Cấu trúc dữ liệu cốt lõi (Data Models)
```text
src/
├── data/
│   ├── provinces.ts      # 5 tỉnh thành & tổng quan 4 mảng
│   ├── heritageSites.ts  # 20 di tích & danh thắng
│   ├── festivals.ts      # 11 lễ hội truyền thống
│   ├── specialties.ts    # 26 đặc sản vùng miền
│   ├── workshops.ts      # 10 trải nghiệm làng nghề
│   └── passportStamps.ts # 10 dấu ấn Hộ Chiếu Săn Dấu
├── components/
│   ├── layout/           # Header, Drawer, Footer, GamificationBanner
│   ├── home/             # Hero, Mission, InteractiveProvinceMap, Highlights
│   ├── modals/           # ProvinceDetailModal (4 tabs), ItemDetailModal, BookingModal
│   ├── passport/         # PassportGrid, StampCard, TrophyModal
│   └── chat/             # AiHeritageAssistant
└── pages/                # Các trang tương ứng 9 mục điều hướng
```

---

## 6. LỘ TRÌNH TRIỂN KHAI (IMPLEMENTATION ROADMAP)

| Giai đoạn | Nội dung công việc chính | Đầu ra (Deliverables) |
| :--- | :--- | :--- |
| **Giai đoạn 1: Nền tảng & Design System** | Khởi tạo project, cấu hình Tailwind với bảng màu Di sản (`#7B1113`, `#D4AF37`, `#FDFBF7`), bộ font tiếng Việt, xây dựng `Header`, `Drawer Menu`, `Footer` và bộ dữ liệu chuẩn cho 5 tỉnh. | Khung ứng dụng hoàn chỉnh + Data Layer đầy đủ (20 địa điểm, 11 lễ hội, 26 đặc sản, 10 workshop). |
| **Giai đoạn 2: Trang chủ & 4 Phân hệ Khám phá** | Xây dựng Trang chủ (Hero, Bản đồ/Thẻ 5 tỉnh + Pop-up 4 tab, Highlights) và các trang *Tỉnh/Thành phố*, *Khám phá*, *Lễ hội*, *Đặc sản* kèm bộ lọc theo tỉnh. | Người dùng duyệt, lọc và xem chi tiết toàn bộ nội dung di sản 5 tỉnh. |
| **Giai đoạn 3: Trải nghiệm, Yêu thích & Gamification** | Xây dựng trang *Trải nghiệm* + luồng *Đặt lịch workshop*, trang *Danh sách Yêu thích* (bộ lọc 5 loại, đồng bộ bộ đếm trên Header), và *Hộ Chiếu Săn Dấu Hồn Việt* (10 dấu ấn + Cúp Phượt Thủ). | Hoàn thiện tính năng tương tác, lưu trữ cá nhân và gamification. |
| **Giai đoạn 4: Tài khoản, AI Assistant & Kiểm thử** | Xây dựng *Tài khoản cá nhân* (Đăng nhập/Đăng ký, quản lý lịch đặt & kiểm tra điều kiện hủy trước 5–7 ngày), tích hợp *Trợ lý AI Hồn Việt Culture*, tối ưu responsive & kiểm thử toàn diện. | Phiên bản web hoàn chỉnh sẵn sàng vận hành và trình diễn. |

---

## 7. ĐÁNH GIÁ CHUYÊN SÂU & KHUYẾN NGHỊ CẢI TIẾN (EXPERT REVIEW)

Phần này tổng hợp đánh giá toàn diện kế hoạch trên từ 3 góc độ chuyên môn nhằm nâng cấp dự án từ một *prototype trình diễn* thành một *sản phẩm du lịch văn hóa hoàn chỉnh, có chiều sâu và khả năng mở rộng cao*.

### 7.1. Góc độ Chuyên gia Du lịch & Văn hóa Bản địa

#### Đánh giá tổng quan
- **Điểm mạnh:** Trục 5 tỉnh (*Cần Thơ – Vĩnh Long – Đồng Tháp – An Giang – Cà Mau*) tạo thành một hành trình liền mạch từ trung tâm sông nước đến vùng đất tâm linh biên viễn và cực Nam Tổ quốc. Sự kết hợp 4 trụ cột (*Di tích – Lễ hội – Đặc sản – Làng nghề*) đáp ứng đúng xu hướng **du lịch trải nghiệm (Experiential Tourism)** và bảo tồn văn hóa bản địa.
- **Điểm còn thiếu:** Nội dung hiện tại mang tính "danh mục tra cứu tĩnh", chưa phản ánh được nhịp điệu thời gian (mùa vụ) và hành trình di chuyển thực tế của du khách tại Đồng bằng sông Cửu Long.

#### Khuyến nghị cải tiến
1. **Bổ sung tính năng "Mùa vụ & Thời điểm vàng" (Seasonality):**
   - Du lịch miền Tây phụ thuộc chặt chẽ vào mùa nước nổi (tháng 9–11 DL), mùa trái cây (tháng 5–8 DL) và lịch Âm lịch của các đại lễ (Lễ hội Bà Chúa Xứ tháng 4 ÂL, Ok Om Bok rằm tháng 10 ÂL).
   - **Cải tiến:** Gắn thẻ thời điểm lý tưởng cho từng địa điểm/lễ hội/đặc sản và bổ sung bộ lọc *"Đang diễn ra / Đẹp nhất mùa này"* ngay trên Trang chủ.
2. **Chuyển hóa "Yêu thích" thành "Gợi ý Lịch trình thông minh" (Itinerary Builder):**
   - Du khách thường đi theo tuyến (ví dụ: *Tuyến 2N1Đ Cần Thơ – Vĩnh Long* hoặc *Tuyến 3N2Đ Đồng Tháp – An Giang*).
   - **Cải tiến:** Cho phép người dùng sắp xếp các mục đã lưu trong *Danh sách Yêu thích* theo ngày/tỉnh, hoặc gợi ý "Điểm đến & Đặc sản lân cận" ngay trong trang chi tiết để kéo dài thời gian lưu trú.
3. **Chuẩn hóa cơ chế xác thực "Hộ Chiếu Săn Dấu Hồn Việt":**
   - Nếu chỉ bấm nút trên web để mở khóa dấu ấn sẽ dễ mất đi giá trị trải nghiệm thực tế.
   - **Cải tiến:** Thiết kế 2 chế độ: *Khám phá trực tuyến* (đọc/hoàn thành mini-quiz văn hóa để mở dấu ấn thử nghiệm) và *Check-in thực địa* (quét mã QR đặt tại điểm di tích/làng nghề hoặc nhập mã xác nhận từ nghệ nhân khi hoàn thành workshop).
4. **Hoàn thiện nghiệp vụ Đặt lịch Workshop:**
   - Bổ sung các trường thông tin thực tế: thời lượng trải nghiệm (ví dụ: 90–120 phút), số lượng khách tối đa/lượt, chi phí nguyên vật liệu, ngôn ngữ hướng dẫn.
   - **Chuẩn hóa quy tắc hủy:** Thay vì ghi khoảng dao động *"từ 5 đến 7 ngày"* dễ gây tranh chấp nghiệp vụ, cần chốt một mốc duy nhất rõ ràng (ví dụ: **Hủy miễn phí trước 5 ngày (120 giờ) so với giờ trải nghiệm**).

---

### 7.2. Góc độ Chuyên gia UI/UX

#### Đánh giá tổng quan
- **Điểm mạnh:** Bảng màu Đỏ thẫm (`#7B1113`) – Vàng đồng (`#D4AF37`) – Kem giấy dó (`#FDFBF7`) kết hợp cặp font Serif/Sans-serif tạo bản sắc văn hóa rất rõ nét, khác biệt hoàn toàn với các trang du lịch đại trà.
- **Điểm còn thiếu:** Mật độ điều hướng quá dày, có nguy cơ vi phạm chuẩn tương phản màu sắc ở các thành phần chữ nhỏ và chưa định nghĩa các trạng thái giao diện phụ (UI States).

#### Khuyến nghị cải tiến
1. **Tinh gọn thanh điều hướng (Giảm từ 9 xuống 5–6 mục chính):**
   - Thanh Header có 9 mục sẽ gây chật chội trên desktop và làm Drawer quá dài trên mobile.
   - **Cải tiến:** Gom nhóm theo cấu trúc:
     - **Menu chính (5 mục):** `Trang chủ` | `Khám phá` *(Dropdown/Tabs: Tỉnh thành, Di tích, Lễ hội, Đặc sản)* | `Trải nghiệm` | `Hộ chiếu Săn Dấu` | `Về Hồn Việt`.
     - **Tiện ích góc phải (Utility Bar):** Nút `❤️ Yêu thích (0)`, `💬 Trợ lý AI`, và `👤 Tài khoản`.
2. **Tối ưu Banner Gamification trên Header:**
   - Đặt một banner chữ dài cố định trên Header sẽ chiếm không gian vùng nhìn đầu tiên (*Above-the-fold*) trên điện thoại.
   - **Cải tiến:** Thu gọn trên Header thành một huy hiệu tiến độ nhỏ gọn (`🛂 0/10`), và đặt Banner kêu gọi hành động đầy đủ ở trang chủ hoặc đầu trang Hộ Chiếu.
3. **Kiểm soát tương phản màu sắc (WCAG AA+):**
   - Màu vàng đồng (`#D4AF37`) trên nền kem (`#FDFBF7`) có độ tương phản thấp, **không dùng cho chữ nhỏ hoặc nền nút chứa chữ trắng**.
   - **Cải tiến:** Dùng `#7B1113` (chữ trắng `#FFFFFF`) cho nút hành động chính (Primary CTA); màu `#D4AF37` chỉ dùng cho viền, icon, huy hiệu trên nền tối hoặc chữ đậm cỡ lớn trên nền đỏ thẫm.
4. **Bổ sung đầy đủ các Trạng thái Giao diện (UI States) & Hỗ trợ tiếp cận:**
   - Thiết kế sẵn **Loading Skeleton** (cho các lưới thẻ nhiều hình ảnh), **Empty State** (khi lọc không có kết quả hoặc Danh sách Yêu thích trống), và **Toast Notification** (khi thêm yêu thích, đặt lịch hoặc mở khóa dấu ấn).

---

### 7.3. Góc độ Chuyên gia Thiết kế Cấu trúc Phần mềm

#### Đánh giá tổng quan
- **Điểm mạnh:** Phân tách thư mục `data/`, `components/`, `pages/` rõ ràng, phù hợp để triển khai nhanh bản MVP bằng React/TypeScript + Tailwind CSS.
- **Điểm còn thiếu:** Dữ liệu đang thiết kế rời rạc theo từng mảng độc lập, thiếu lớp trừu tượng hóa lưu trữ, chưa có kiến trúc kiểm soát dữ liệu cho Trợ lý AI và chiến lược tối ưu tài nguyên đa phương tiện.

#### Khuyến nghị cải tiến
1. **Chuẩn hóa Mô hình Dữ liệu Quan hệ (Relational Data Schema):**
   - Để Pop-up 4 tab của Tỉnh tự động tổng hợp dữ liệu và gợi ý các điểm liên quan mà không bị trùng lặp dữ liệu, mọi thực thể (`HeritageSite`, `Festival`, `Specialty`, `Workshop`, `PassportStamp`) cần có khóa ngoại `provinceId`, `id`, `slug`, `tags[]`, và tọa độ `coordinates: { lat, lng }`.
   - Ví dụ: Khi xem *Vương quốc gốm đỏ Mang Thít* (`HeritageSite`), hệ thống tự động truy vấn ra workshop *Tự tay chuốt gốm đỏ* (`Workshop`) thông qua `relatedWorkshopIds`.
2. **Kiến trúc Trợ lý AI chống bịa thông tin (Grounded AI Assistant):**
   - Không để AI trả lời tự do ngoài dữ liệu dự án (tránh sai lệch lịch lễ hội hoặc chính sách đặt/hủy).
   - **Cải tiến:** Áp dụng cơ chế **RAG nhẹ / Context Injection** trực tiếp từ tập JSON dữ liệu chuẩn của 5 tỉnh. Câu trả lời của AI nên trả về kèm **thẻ liên kết nhanh (Deep-link Cards)** dẫn thẳng tới trang chi tiết địa điểm hoặc modal đặt lịch workshop tương ứng.
3. **Áp dụng Lớp Trừu tượng hóa Dịch vụ (Service / Repository Layer):**
   - Dù giai đoạn đầu dùng `localStorage` cho *Yêu thích*, *Hộ chiếu* và *Đặt lịch*, cần tách logic đọc/ghi qua các interface như `IBookingService`, `IPassportService`, `IAuthService`.
   - **Lợi ích:** Khi nâng cấp lên Backend thực tế (Supabase, Firebase hoặc REST API), chỉ cần thay thế tầng Service mà không phải viết lại bất kỳ component UI nào.
4. **Chiến lược Tối ưu Hiệu năng & Hình ảnh (Performance):**
   - Kho nội dung gồm ~70+ địa điểm, lễ hội, đặc sản và workshop đòi hỏi lượng ảnh lớn.
   - **Cải tiến:** Quy định chuẩn ảnh định dạng **WebP/AVIF**, áp dụng `loading="lazy"`, đặt tỷ lệ khung hình cố định (`aspect-[4/3]` hoặc `aspect-[16/10]`) để chống nhảy bố cục (CLS), và dùng URL query params (`?province=can-tho&category=le-hoi`) cho bộ lọc để người dùng có thể chia sẻ đường dẫn trực tiếp.

---

### 7.4. Bảng Tổng hợp Cập nhật Lộ trình (Đề xuất điều chỉnh)

| Hạng mục | Trước đánh giá | Sau khi cải tiến (Khuyến nghị áp dụng) |
| :--- | :--- | :--- |
| **Thanh điều hướng** | 9 mục ngang hàng | 5 mục chính + 3 Utility Icons (Yêu thích, AI, Tài khoản) |
| **Quy tắc hủy lịch** | Dao động "5 đến 7 ngày" | Chốt cố định **trước 5 ngày (120 giờ)** để lập trình tự động |
| **Dữ liệu & Lưu trữ** | 5 file JSON độc lập + `localStorage` trực tiếp | Schema có khóa ngoại (`provinceId`, `relatedIds`) + tầng `services/` |
| **Trải nghiệm du lịch** | Xem từng điểm rời rạc | Thêm nhãn **Mùa vụ/Thời điểm vàng** & gợi ý **Điểm lân cận** |
| **Trợ lý AI** | Chat text thông thường | Grounded trên dữ liệu 5 tỉnh + trả về **Card điều hướng nhanh** |

---

## 8. KIẾN TRÚC TRIỂN KHAI & QUY TRÌNH PHÁT HÀNH (LOCAL → GITHUB → SUPABASE → VERCEL)

Dự án sẽ được xây dựng và phát hành theo quy trình 4 bước khép kín, đảm bảo vận hành ổn định từ môi trường máy cá nhân đến môi trường Production thực tế:

### 8.1. Giai đoạn A: Phát triển & Kiểm thử trên Local
- Khởi tạo dự án trên máy cá nhân (`d:\Antigravity\Hồn Việt`) với **Vite + React + TypeScript + Tailwind CSS** (hoặc Next.js).
- Xây dựng đầy đủ giao diện, Design System, bộ dữ liệu chuẩn 5 tỉnh ĐBSCL, và lớp `services/` trừu tượng hóa.
- Chạy kiểm thử toàn bộ luồng tương tác, bộ lọc, đặt lịch workshop, Hộ chiếu Săn Dấu và responsive trên trình duyệt local (`localhost`).

### 8.2. Giai đoạn B: Thiết lập Backend & Cơ sở dữ liệu với Supabase
- Tạo Project trên **Supabase** và thiết kế các bảng dữ liệu (PostgreSQL):
  - `profiles`: Thông tin người dùng mở rộng (họ tên, số điện thoại, danh hiệu).
  - `favorites`: Danh sách mục yêu thích đồng bộ theo `user_id` (`item_id`, `category`).
  - `bookings`: Lịch đặt trải nghiệm làng nghề (`user_id`, `workshop_id`, `booking_date`, `guests`, `status`, quy tắc hủy trước 5 ngày / 120 giờ).
  - `passport_stamps`: Tiến độ mở khóa 10 dấu ấn thất truyền (`user_id`, `stamp_id`, `unlocked_at`, `verification_method`).
- Kích hoạt **Supabase Auth** (Email/Password) và cấu hình **Row Level Security (RLS)** để mỗi người dùng chỉ đọc/ghi được dữ liệu của chính mình.
- Kết nối ứng dụng local với Supabase thông qua biến môi trường trong `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

### 8.3. Giai đoạn C: Quản lý mã nguồn & Đẩy lên GitHub
- Khởi tạo Git repository (`git init`), thiết lập `.gitignore` chuẩn (loại trừ `node_modules/`, `dist/`, `.env*`).
- Commit mã nguồn theo từng mốc rõ ràng và đẩy (push) lên **GitHub Repository**.

### 8.4. Giai đoạn D: Triển khai Production lên Vercel
- Kết nối trực tiếp GitHub Repository vào **Vercel** để kích hoạt **CI/CD tự động** (mỗi lần `git push` lên nhánh `main` sẽ tự động build & deploy bản mới).
- Khai báo đầy đủ các biến môi trường Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) trên **Vercel Project Settings → Environment Variables**.
- Kiểm tra vận hành thực tế trên tên miền `*.vercel.app` (xác thực đăng nhập, lưu yêu thích, đặt lịch workshop và đồng bộ dữ liệu Supabase).

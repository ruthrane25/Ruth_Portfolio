import os
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode

WIDTH = 1584
HEIGHT = 396

def create_banner():
    # Load fonts from Windows Fonts
    font_dir = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts')
    
    def get_font(name, size):
        path = os.path.join(font_dir, name)
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
        return ImageFont.load_default()

    font_badge = get_font('consolab.ttf', 13)
    font_heading = get_font('bahnschrift.ttf', 44)
    if font_heading == ImageFont.load_default():
        font_heading = get_font('segoeuib.ttf', 42)
    font_subtext = get_font('segoeui.ttf', 15)
    font_pill = get_font('consolab.ttf', 13)
    font_qr_title = get_font('segoeuib.ttf', 14)
    font_qr_url = get_font('consolab.ttf', 11)
    font_qr_footer = get_font('segoeui.ttf', 10.5)

    # 1. Base Obsidian Dark Background (#030712)
    base = Image.new('RGBA', (WIDTH, HEIGHT), (3, 7, 18, 255))
    
    # 2. Ambient Spotlights & Gradients
    glow_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)

    # Top-left electric cyan glow
    for r in range(360, 0, -6):
        alpha = int(48 * (1 - r / 360)**2)
        glow_draw.ellipse([-80 - r, -80 - r, -80 + r, -80 + r], fill=(6, 182, 212, alpha))

    # Center-top violet accent ambient glow
    for r in range(300, 0, -8):
        alpha = int(32 * (1 - r / 300)**1.8)
        glow_draw.ellipse([640 - r, -120 - r, 640 + r, -120 + r], fill=(139, 92, 246, alpha))

    # Bottom-right emerald ambient glow (behind QR card)
    for r in range(340, 0, -6):
        alpha = int(55 * (1 - r / 340)**1.9)
        glow_draw.ellipse([1400 - r, 300 - r, 1400 + r, 300 + r], fill=(16, 185, 129, alpha))

    base = Image.alpha_composite(base, glow_layer)

    # 3. Fine Cyber Grid Pattern with radial falloff
    grid_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    grid_step = 36

    for x in range(0, WIDTH, grid_step):
        grid_draw.line([(x, 0), (x, HEIGHT)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, HEIGHT, grid_step):
        grid_draw.line([(0, y), (WIDTH, y)], fill=(255, 255, 255, 8), width=1)

    # Diagonal cyber accent guide lines
    grid_draw.line([(0, 80), (160, 0)], fill=(6, 182, 212, 35), width=1)
    grid_draw.line([(WIDTH - 200, HEIGHT), (WIDTH, HEIGHT - 100)], fill=(16, 185, 129, 35), width=1)

    # Cyber Particle Dust
    random.seed(1337)
    for _ in range(85):
        px = random.randint(0, WIDTH)
        py = random.randint(0, HEIGHT)
        dist_edge = min(px, WIDTH - px, py, HEIGHT - py)
        alpha = int(random.randint(70, 200) * (1 - min(1, dist_edge / 550)))
        if alpha > 20:
            pr = random.choice([1, 1.5, 2])
            color = random.choice([
                (6, 182, 212, alpha),
                (52, 211, 153, alpha),
                (167, 139, 250, alpha),
                (255, 255, 255, alpha)
            ])
            grid_draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=color)

    base = Image.alpha_composite(base, grid_layer)

    # 4. Content Drawing
    content_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(content_layer)

    LEFT_MARGIN = 75

    # A. Top Badge Pill
    badge_text = "RUTHVIJ RANE  //  SOFTWARE DESIGN ENGINEER"
    bbox = font_badge.getbbox(badge_text)
    bw = bbox[2] - bbox[0] + 34
    bh = 26
    by = 46

    # Badge background & border
    draw.rounded_rectangle([LEFT_MARGIN, by, LEFT_MARGIN + bw, by + bh], radius=13, fill=(15, 23, 42, 200), outline=(6, 182, 212, 100), width=1)
    # Pulsing live indicator dot
    draw.ellipse([LEFT_MARGIN + 12, by + 9, LEFT_MARGIN + 20, by + 17], fill=(52, 211, 153, 255))
    draw.text((LEFT_MARGIN + 28, by + 5), badge_text, font=font_badge, fill=(103, 232, 249, 240))

    # B. Main Heading (Large & Bold - White/Cyan Glow)
    heading_y = 88
    # Subtle glow behind heading
    glow_head = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    gh_draw = ImageDraw.Draw(glow_head)
    gh_draw.text((LEFT_MARGIN, heading_y), "BUILDING SCALABLE SOFTWARE &", font=font_heading, fill=(6, 182, 212, 60))
    gh_draw.text((LEFT_MARGIN, heading_y + 52), "INDUSTRIAL AUTOMATION", font=font_heading, fill=(6, 182, 212, 120))
    glow_head = glow_head.filter(ImageFilter.GaussianBlur(10))
    content_layer = Image.alpha_composite(content_layer, glow_head)
    draw = ImageDraw.Draw(content_layer)

    # Crisp Front Text
    draw.text((LEFT_MARGIN, heading_y), "BUILDING SCALABLE SOFTWARE &", font=font_heading, fill=(255, 255, 255, 255))
    draw.text((LEFT_MARGIN, heading_y + 52), "INDUSTRIAL AUTOMATION", font=font_heading, fill=(34, 211, 238, 255))

    # C. Subtext / Mission Statement
    subtext_y = 210
    subtext_str = "High-precision PyQt/PySide machine control suites  •  Hardware communication pipelines  •  Modern full-stack web"
    draw.text((LEFT_MARGIN, subtext_y), subtext_str, font=font_subtext, fill=(148, 163, 184, 230))

    # D. Tech Stack Pills (Smaller - Muted Gray with Cyan/Green accent borders)
    # [ Python ]  •  [ PyQt / Desktop Apps ]  •  [ React & SvelteKit ]  •  [ Data Parsing & Systems ]
    pills = [
        ("Python", (6, 182, 212)),
        ("PyQt / Desktop Apps", (16, 185, 129)),
        ("React & SvelteKit", (139, 92, 246)),
        ("Data Parsing & Systems", (6, 182, 212)),
        ("RS-232 / Hardware Comms", (16, 185, 129)),
    ]

    pill_x = LEFT_MARGIN
    pill_y = 260
    pill_h = 32

    for title, border_col in pills:
        formatted = f"[ {title} ]"
        p_bbox = font_pill.getbbox(formatted)
        pw = p_bbox[2] - p_bbox[0] + 20
        # Rounded pill box
        draw.rounded_rectangle(
            [pill_x, pill_y, pill_x + pw, pill_y + pill_h],
            radius=8,
            fill=(11, 15, 25, 220),
            outline=(border_col[0], border_col[1], border_col[2], 120),
            width=1
        )
        draw.text((pill_x + 10, pill_y + 8), formatted, font=font_pill, fill=(226, 232, 240, 240))
        pill_x += pw + 12

    # Bottom metric / verification indicator
    stat_y = 318
    draw.text((LEFT_MARGIN, stat_y), "⚡ 6+ Flagship Industrial Machines Engineered  |  Sub-Micron Motion Synchronization  |  Production Deployed", font=font_subtext, fill=(100, 116, 139, 230))

    # 5. Right Side Element: Glowing Tech Card with QR Code
    card_w = 320
    card_h = 316
    card_x = WIDTH - card_w - 75
    card_y = 40

    # Card outer glow shadow
    card_glow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    cg_draw = ImageDraw.Draw(card_glow)
    cg_draw.rounded_rectangle([card_x - 6, card_y - 6, card_x + card_w + 6, card_y + card_h + 6], radius=22, fill=(6, 182, 212, 40))
    card_glow = card_glow.filter(ImageFilter.GaussianBlur(14))
    base = Image.alpha_composite(base, card_glow)

    # Card surface
    card_surface = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    cs_draw = ImageDraw.Draw(card_surface)
    cs_draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=18,
        fill=(8, 13, 24, 230),
        outline=(6, 182, 212, 110),
        width=2
    )
    # Top card accent line
    cs_draw.line([(card_x + 30, card_y), (card_x + card_w - 30, card_y)], fill=(34, 211, 238, 220), width=2)

    # Card Title
    title_text = "🔗 Explore Live Portfolio"
    t_bbox = font_qr_title.getbbox(title_text)
    tw = t_bbox[2] - t_bbox[0]
    cs_draw.text((card_x + (card_w - tw) // 2, card_y + 18), title_text, font=font_qr_title, fill=(255, 255, 255, 255))

    # Card URL subtext
    url_text = "ruthportfolio-five.vercel.app"
    u_bbox = font_qr_url.getbbox(url_text)
    uw = u_bbox[2] - u_bbox[0]
    cs_draw.text((card_x + (card_w - uw) // 2, card_y + 40), url_text, font=font_qr_url, fill=(34, 211, 238, 230))

    # Generate QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=5,
        border=2,
    )
    qr.add_data('https://ruthportfolio-five.vercel.app/')
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color='#030712', back_color='#ffffff').convert('RGBA')

    # Add rounded border container around QR code
    qr_size = 175
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    qr_box_x = card_x + (card_w - qr_size) // 2
    qr_box_y = card_y + 68

    # QR background plate with border
    cs_draw.rounded_rectangle(
        [qr_box_x - 5, qr_box_y - 5, qr_box_x + qr_size + 5, qr_box_y + qr_size + 5],
        radius=12,
        fill=(255, 255, 255, 255),
        outline=(52, 211, 153, 180),
        width=2
    )

    card_surface.paste(qr_img, (qr_box_x, qr_box_y), qr_img)

    # QR Bottom instructions
    footer_text = "Scan with Camera to View Live Demos"
    f_bbox = font_qr_footer.getbbox(footer_text)
    fw = f_bbox[2] - f_bbox[0]
    cs_draw.text((card_x + (card_w - fw) // 2, card_y + card_h - 35), footer_text, font=font_qr_footer, fill=(148, 163, 184, 230))

    # Live connection badge on bottom of card
    live_badge = "● LIVE PRODUCTION"
    lb_bbox = font_qr_footer.getbbox(live_badge)
    lbw = lb_bbox[2] - lb_bbox[0]
    cs_draw.text((card_x + (card_w - lbw) // 2, card_y + card_h - 18), live_badge, font=font_qr_footer, fill=(52, 211, 153, 240))

    # 6. Bottom Accent Laser Beam across the full width
    laser_y = HEIGHT - 6
    cs_draw.line([(0, laser_y), (WIDTH, laser_y)], fill=(15, 23, 42, 200), width=3)
    cs_draw.line([(LEFT_MARGIN, laser_y), (LEFT_MARGIN + 600, laser_y)], fill=(34, 211, 238, 240), width=3)
    cs_draw.line([(LEFT_MARGIN + 620, laser_y), (LEFT_MARGIN + 900, laser_y)], fill=(52, 211, 153, 220), width=3)
    cs_draw.line([(card_x, laser_y), (card_x + card_w, laser_y)], fill=(139, 92, 246, 220), width=3)

    # Composite all layers
    final_image = Image.alpha_composite(base, content_layer)
    final_image = Image.alpha_composite(final_image, card_surface)

    # Save PNG (lossless)
    png_path = "Ruthvij_Rane_LinkedIn_Banner.png"
    final_image.save(png_path, "PNG", optimize=True)
    print(f"Saved PNG banner to: {png_path} ({os.path.getsize(png_path)} bytes)")

    # Save JPG (high-res quality 98)
    jpg_path = "Ruthvij_Rane_LinkedIn_Banner.jpg"
    final_rgb = final_image.convert('RGB')
    final_rgb.save(jpg_path, "JPEG", quality=98)
    print(f"Saved JPG banner to: {jpg_path} ({os.path.getsize(jpg_path)} bytes)")

    # Copy to public folder for portfolio asset access
    public_png = os.path.join("public", "Ruthvij_Rane_LinkedIn_Banner.png")
    public_jpg = os.path.join("public", "Ruthvij_Rane_LinkedIn_Banner.jpg")
    final_image.save(public_png, "PNG", optimize=True)
    final_rgb.save(public_jpg, "JPEG", quality=98)
    print(f"Copied to {public_png} and {public_jpg}")

if __name__ == '__main__':
    create_banner()

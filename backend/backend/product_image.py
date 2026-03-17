

def process_image(image_field):
    from PIL import Image, ImageOps
    import os

    img_path = image_field.path
    img = Image.open(img_path)

    # Fix orientation (VERY important)
    img = ImageOps.exif_transpose(img)

    # Resize only if needed
    if img.width > 800 or img.height > 800:
        img.thumbnail((800, 800), Image.LANCZOS)

    # Handle palette images
    if img.mode == "P":
        img = img.convert("RGBA")

    # Save as WebP
    webp_path = os.path.splitext(img_path)[0] + ".webp"

    img.save(
        webp_path,
        "WEBP",
        quality=85,
        method=6  # better compression
    )

    # Update field
    image_field.name = os.path.splitext(image_field.name)[0] + ".webp"

    # Remove original
    if os.path.exists(img_path):
        os.remove(img_path)

    return image_field.name
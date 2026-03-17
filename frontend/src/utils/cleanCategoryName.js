export function upperCategoryName(category_name) {
    return  category_name?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

}

export function lowerCategoryName(category_name) {
    return  category_name?.toLowerCase().replace(" ", "-");

}
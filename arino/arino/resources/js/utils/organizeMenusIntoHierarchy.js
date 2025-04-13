export default function organizeMenusIntoHierarchy(flatMenus) {
    const menuHierarchy = [];

    const menuMap = new Map(); // Use a Map to efficiently lookup menus by ID

    // First, create a map of menus by their IDs
    flatMenus.forEach(menu => {
        menuMap.set(menu.id, { ...menu, children: [] });
    });

    // Then, build the hierarchy
    flatMenus.forEach(menu => {
        if (menu.parent_id !== null) {
            const parentMenu = menuMap.get(menu.parent_id);
            if (parentMenu) {
                parentMenu.children.push(menuMap.get(menu.id));
            }
        } else {
            // If it has no parent, it's a root menu
            menuHierarchy.push(menuMap.get(menu.id));
        }
    });

    return menuHierarchy;
}

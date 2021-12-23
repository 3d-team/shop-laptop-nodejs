class MenuContent{
    constructor(){
        this.title = "";
        this.home_menu_item_status = "";
        this.products_menu_item_status = "";
        this.about_menu_item_status = "";
        this.contact_menu_item_status = "";
    }
    
    reset(){
        this.title = "";
        this.home_menu_item_status = "";
        this.products_menu_item_status = "";
        this.about_menu_item_status = "";
        this.contact_menu_item_status = "";
    }

    getContentHomeMenuItem(){
        this.reset();
        this.title = "Home";
        this.home_menu_item_status="item-active";
        return this;
    }
    getContentProductMenuItem(){
        this.reset();
        this.title = "Products";
        this.products_menu_item_status="item-active";
        return this;
    }
    getContentAboutMenuItem(){
        this.reset();
        this.title = "About";
        this.about_menu_item_status="item-active";
        return this;
    }
    getContentContactMenuItem(){
        this.reset();
        this.title = "Contact";
        this.contact_menu_item_status="item-active";
        return this;
    }
    
}

module.exports = new MenuContent();
const LS_KEYS = {
    BOOK: 'item',
}

class LocalStorageService {

    static get (key){
        const value = window.localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    static set (key,value){
        return localStorage.setItem(key, JSON.stringify(value));
    }
    static remove (key){
        return localStorage.removeItem(key);
    }
    static ClearAll(){
        return localStorage.clear();
    }  
}
export {LS_KEYS, LocalStorageService};
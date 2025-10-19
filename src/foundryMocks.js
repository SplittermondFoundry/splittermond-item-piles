global.Hooks = new class {
    map = new Map();
    once(name, func){
        if(!this.map.has(name)){
            this.map.set(name, []);
        }
        this.map.get(name).push(func);
    }
}()
global.game = {}
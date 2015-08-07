module.exports = PriorityQueue;


function PriorityQueue() {
    // properties
    this.queue = [];

    // public methods
    this.enqueue = function(key, priority) {
        var item = new Item(key, priority);
        this.queue.push(item);
        this.queue.sort(function(a, b) {
            return a.priority - b.priority;
        });
    }

    this.decreasePriority = function(key, newPriority) {
        this.queue.forEach(function(item, idx, arr) {
            if (item.key === key) {
                item.priority = newPriority;
            }
        });
        this.queue.sort(function(a, b) {
            return a.priority - b.priority;  
        })
    }

    this.hasItem = function(key) {
        this.queue.forEach(function(item, idx, arr) {
            if (item.key === key) {
                return true;
            }
        });
        return false;
    }

    this.unqueue = function() {
        return this.queue.shift();
    }
    
    this.isEmpty = function() {
        return (this.queue.length === 0);
    }
    
    function Item(key, priority) {
        this.key = key; 
        this.priority = priority;
    }
}
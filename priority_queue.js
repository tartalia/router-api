'use strict';
module.exports = PriorityQueue;

/**
 * A naive priority queue implementation.
 *
 * Author: Rafael Tartalia (rafael.tartalia@gmail.com)
 */
function PriorityQueue() {
    // public
    this.queue = [];
    
    /**
     * Enqueue an item and sort the queue by priority.      
     */
    this.enqueue = function(key, priority) {
        var item = new Item(key, priority);
        this.queue.push(item);
        this.queue.sort(function(a, b) {
            return a.priority - b.priority;
        });
    }

    /**
     * Decrease the priority of an existing item and re-sort the queue.
     *
     * @param key Item key
     * @param newPriority The new priority
     */
    this.decreasePriority = function(key, newPriority) {
        if (!this.hasItem(key)) {
            throw new ReferenceError('item ' + k + ' does not exist');
        }

        this.queue.forEach(function(item, idx, arr) {
            if (item.key === key) {
                item.priority = newPriority;
            }
        });
        this.queue.sort(function(a, b) {
            return a.priority - b.priority;  
        });
    }

    /**
     * Decrease the priority of an existing item 
     * 
     * @param key Item key
     * @return true exists item with k key, otherwise false
     */
    this.hasItem = function(key) {
        this.queue.forEach(function(item, idx, arr) {
            if (item.key === key) {
                return true;
            }
        });
        return false;
    }

    /**
     * Unqueue an item.
     * 
     * @return The unqueued item.
     */
    this.unqueue = function() {
        return this.queue.shift();
    }
    
    /**
     * Checks if the queue is empty.
     * 
     * @return True if the queue is empty, otherwise false
     */        
    this.isEmpty = function() {
        return (this.queue.length === 0);
    }
    
    // private
    
    // Item data type
    function Item(key, priority) {
        this.key = key; 
        this.priority = priority;
    }
}
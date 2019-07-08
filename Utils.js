/*
 * Utilities
 * *********
 */

/**
 * Transform a Sting to Array deleting duplicated characters
 * @param {*} string 
 */
export function getArrayFromStringWithoutDuplicates(string) {
    string = string.split('')   // String to Array
    string = new Set(string)    // Array to Set (to delete duplicates)
    return [...string]          // Set to Array
}

/**
 * Get a random integer from a min and max values
 * @param {*} min 
 * @param {*} max 
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
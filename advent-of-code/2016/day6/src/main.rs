// Day 6

use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents).expect("Something went wrong reading the file.");

    // Part 1
    let mut counts: Vec<HashMap<char, usize>> = Vec::new();
    for _i in 0..contents.lines().next().unwrap().chars().count() {
        counts.push(HashMap::new());
    }

    for line in contents.lines() {
        for (index, ch) in line.chars().enumerate() {
            let count = counts[index].entry(ch).or_insert(0);
            *count += 1;
        }
    }

    let mut message = String::new();

    for pos_map in counts {
        let mut pos_vec: Vec<(&char, &usize)> = pos_map.iter().collect();
        pos_vec.sort_by(|a, b| b.1.cmp(a.1));
        message.push(*pos_vec[0].0);
    }

    println!("Part 1: {}", message);

    // Part 2
    let mut counts: Vec<HashMap<char, usize>> = Vec::new();
    for _i in 0..contents.lines().next().unwrap().chars().count() {
        counts.push(HashMap::new());
    }

    for line in contents.lines() {
        for (index, ch) in line.chars().enumerate() {
            let count = counts[index].entry(ch).or_insert(0);
            *count += 1;
        }
    }

    let mut message = String::new();

    for pos_map in counts {
        let mut pos_vec: Vec<(&char, &usize)> = pos_map.iter().collect();
        pos_vec.sort_by(|a, b| a.1.cmp(b.1));
        message.push(*pos_vec[0].0);
    }

    println!("Part 2: {}", message);
}

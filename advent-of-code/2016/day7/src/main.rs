// Day 7

use std::fs::File;
use std::io::prelude::*;
use std::iter::FromIterator;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("Something went wrong reading the file.");

    // Part 1
    let mut counter = 0;

    for line in contents.lines() {
        let mut valid = false;
        let mut in_hypernet = false;

        for window in line.chars().collect::<Vec<char>>().windows(4) {
            if window.contains(&'[') {
                in_hypernet = true;
                continue;
            } else if window.contains(&']') {
                in_hypernet = false;
                continue;
            }

            if window.get(0).unwrap() == window.get(3).unwrap()
                && window.get(1).unwrap() == window.get(2).unwrap()
                && window.get(0).unwrap() != window.get(1).unwrap()
            {
                match in_hypernet {
                    true => {
                        valid = false;
                        break;
                    }
                    false => {
                        valid = true;
                    }
                }
            }
        }

        if valid {
            counter += 1;
        }
    }

    println!("Part 1: {}", counter);

    // Part 2
    let mut counter = 0;

    for line in contents.lines() {
        let mut abas = Vec::new();
        let mut babs = Vec::new();

        let mut in_hypernet = false;

        for window in line.chars().collect::<Vec<char>>().windows(3) {
            if window.contains(&'[') {
                in_hypernet = true;
                continue;
            } else if window.contains(&']') {
                in_hypernet = false;
                continue;
            }

            if window.get(0).unwrap() == window.get(2).unwrap()
                && window.get(0).unwrap() != window.get(1).unwrap()
            {
                if in_hypernet {
                    babs.push(window.to_owned());
                } else {
                    abas.push(window.to_owned());
                }
            }
        }

        if abas.iter().any(|chars| {
            let flipped = vec![chars[1], chars[0], chars[1]];
            babs.contains(&flipped)
        }) {
            counter += 1;
        }
    }

    println!("Part 2: {}", counter);
}

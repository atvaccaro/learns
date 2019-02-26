// Day 9

use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("Something went wrong reading the file.");

    // Part 1
    let mut output = String::new();
    let mut chars = contents.chars();
    let mut in_length = false;
    let mut in_repeat = false;
    let mut length = String::new();
    let mut repeat = String::new();

    while let Some(ch) = chars.next() {
        match ch {
            '(' => {
                in_length = true;
            },
            ')' => {
                in_repeat = false;
                let mut to_insert = String::new();
                for _i in 0..length.parse::<u32>().unwrap() {
                    to_insert.push(chars.next().unwrap());
                }
                for _j in 0..repeat.parse::<u32>().unwrap() {
                    output.push_str(&to_insert);
                }

                length = String::new();
                repeat = String::new();
            },
            'x' => {
                in_length = false;
                in_repeat = true;
            },
            _ => {
                if in_length {
                    length.push(ch);
                } else if in_repeat {
                    repeat.push(ch);
                } else {
                    output.push(ch);
                }
            }
        }
    }

    println!("Part 1: {}", output.len());

    // Part 2
    fn decompress(chars: &[char]) -> usize {
        let mut in_length = false;
        let mut in_repeat = false;
        let mut length_str = String::new();
        let mut repeat_str = String::new();
        let mut total = 0;
        let mut i = 0;

        while i < chars.len() {
            let ch = chars[i];
            match ch {
                '(' => {
                    in_length = true;
                },
                ')' => {
                    in_repeat = false;

                    i += 1;
                    let length = length_str.parse::<usize>().unwrap();
                    if chars[i..i+length].contains(&'(') {
                        total += repeat_str.parse::<usize>().unwrap() * decompress(&chars[i..i+length]);
                    } else {
                        total += repeat_str.parse::<usize>().unwrap() * length;
                    }

                    length_str = String::new();
                    repeat_str = String::new();
                    i += length-1; // because we increment at the end of the loop
                },
                'x' => {
                    in_length = false;
                    in_repeat = true;
                },
                _ => {
                    if in_length {
                        length_str.push(ch);
                    } else if in_repeat {
                        repeat_str.push(ch);
                    } else {
                        total += 1;
                    }
                }
            };
            i += 1;
        }
        total
    }

    println!("Part 2: {}", decompress(&contents.chars().collect::<Vec<char>>()[..]));
}

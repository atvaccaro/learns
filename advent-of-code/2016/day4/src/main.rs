//Day 4

use std::char;
use std::fs::File;
use std::io::prelude::*;

extern crate itertools;

use itertools::Itertools;

fn main() {
    let all_chars = "abcdefghijklmnopqrstuvwxyz";

    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents).expect("Something went wrong reading the file.");

    // Part 1
    let mut sum = 0;

    for line in contents.lines() {
        let symbols: Vec<String> = line.split(&['-', '[', ']'][..])
            .map(|s| String::from(s))
            .collect();
        let name = symbols.iter().cloned().take(symbols.len() - 3).join("");
        let sector_id = symbols[symbols.len() - 3].parse::<i32>().unwrap();
        let checksum = &symbols[symbols.len() - 2];

        let mut counts = Vec::<(char, usize)>::new();
        for c in all_chars.chars() {
            counts.push((c, name.matches(c).count()));
        }

        let sorted = counts.sort_by(|a, b| {
            if a.1 == b.1 {
                a.0.cmp(&b.0)
            } else {
                b.1.cmp(&a.1)
            }
        });

        let chars: String = counts.iter().map(|a| a.0).take(checksum.len()).collect();
        if *checksum == chars {
            sum += sector_id;
        }
    }

    println!("Part 1: {}", sum);

    // Part 2
    for line in contents.lines() {
        let symbols: Vec<String> = line.split(&['-', '[', ']'][..])
            .map(|s| String::from(s))
            .collect();
        let name = symbols.iter().cloned().take(symbols.len() - 3).join(" ");
        let sector_id = symbols[symbols.len() - 3].parse::<u32>().unwrap();

        let decrypted: String = name.chars()
            .map(|c| {
                match c {
                    ' ' => c,
                    _ => {
                        let mut new_char = u32::from(c) + sector_id % 26;
                        if new_char > 'z' as u32 {
                            new_char -= 26;
                        }
                        char::from_u32(new_char).unwrap()
                    }
                }
            }).collect();

        if decrypted.contains("north") {
            println!("Part 2: {}", sector_id);
        }
    }

}

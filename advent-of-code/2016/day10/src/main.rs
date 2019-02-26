// Day 10

use std::collections::HashMap;
use std::collections::hash_map::Entry::{Occupied, Vacant};
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("Something went wrong reading the file.");

    // Part 1
    let mut bots: HashMap<i32, (i32, i32)> = HashMap::new();
    for line in contents.lines() {
        let symbols: Vec<&str> = line.split_whitespace().collect();

        if symbols[0] == "value" {
            let val: i32 = symbols[1].parse().unwrap();
            let bot_num: i32 = symbols[5].parse().unwrap();

            let bot = match bots.entry(bot_num) {
                Vacant(entry) => entry.insert((-1, -1)),
                Occupied(entry) => entry.into_mut(),
            };

            if bot.0 == -1 {
                bot.0 = val;
            } else {
                bot.1 = val;
            }
        }
    }

    for line in contents.lines().cycle() {
        let symbols: Vec<&str> = line.split_whitespace().collect();

        if symbols[0] == "bot" {
            println!("{}", line);
            let bot_num: i32 = symbols[1].parse().unwrap();

            {
                let entry = bots.entry(bot_num);
                let bot = match entry {
                    Vacant(obj) => obj.insert((-1, -1)),
                    Occupied(obj) => obj.into_mut(),
                };
            }

            if (bots.get(&bot_num).unwrap().0 == 61 && bots.get(&bot_num).unwrap().1 == 17) ||
                (bots.get(&bot_num).unwrap().0 == 17 && bots.get(&bot_num).unwrap().1 == 61) {
                println!("Part 1: {}", bot_num);
                break;
            }

            let low_bot: i32 = symbols[6].parse().unwrap();
            let high_bot: i32 = symbols[11].parse().unwrap();
        }
    }

    // Part 2
}

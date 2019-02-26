// Day 8

use std::char;
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("Something went wrong reading the file.");

    let screen_width = 50;
    let screen_height = 6;

    // Part 1
    let mut screen = vec![vec![0 as u32; screen_height]; screen_width];

    for line in contents.lines() {
        let symbols: Vec<&str> = line.split_whitespace().collect();
        let instruction = symbols[0];

        match instruction {
            "rect" => {
                let mut size = symbols[1].split("x");
                let width = size.next().unwrap().parse::<usize>().unwrap();
                let height = size.next().unwrap().parse::<usize>().unwrap();

                for x in 0..width {
                    for y in 0..height {
                        screen[x][y] = 1;
                    }
                }
            },
            "rotate" => {
                let dir = symbols[1];
                let mut id = symbols[2].split("=");
                let which = id.nth(1).unwrap().parse::<usize>().unwrap();
                let shift = symbols[4].parse::<usize>().unwrap();
                match dir {
                    "row" => {
                        for _i in 0..shift {
                            let last = screen[screen_width-1][which];
                            for x in (1..screen_width).rev() {
                                screen[x][which] = screen[x-1][which];
                            }
                            screen[0][which] = last;
                        }
                    },
                    "column" => {
                        for _i in 0..shift {
                            let last = screen[which][screen_height-1];
                            for y in (1..screen_height).rev() {
                                screen[which][y] = screen[which][y-1];
                            }
                            screen[which][0] = last;
                        }
                    },
                    _ => panic!(),
                }
            },
            _ => panic!(),
        }
    }

    let mut disp = String::new();
    for y in 0..screen_height {
        for x in 0..screen_width {
            disp.push(char::from_digit(screen[x][y], 10).unwrap());
            disp.push(' ');
        }
        disp.push('\n');
    }

    println!("Part 1: {}",
             screen.iter()
                 .flat_map(|v| v.iter())
                 .filter(|&i| *i == 1)
                 .collect::<Vec<&u32>>()
                 .len());
    println!("Part 2: \n{}", disp);
}

// Day 3
#![feature(iterator_step_by)]

use std::fs::File;
use std::io::prelude::*;
use std::iter::StepBy;
use std::slice::Chunks;

fn main() {
    let mut f = File::open("input.txt").expect("File not found.");

    let mut contents = String::new();
    f.read_to_string(&mut contents).expect("Something went wrong reading the file.");

    // Part 1
    let mut counter = 0;

    for line in contents.lines() {
        let mut nums = line.split_whitespace();

        let s1 = nums.next().unwrap().parse::<usize>().unwrap();
        let s2 = nums.next().unwrap().parse::<usize>().unwrap();
        let s3 = nums.next().unwrap().parse::<usize>().unwrap();

        if s1 + s2 > s3
            && s2 + s3 > s1
            && s1 + s3 > s2 {
            counter += 1;
        }
    }

    println!("Part 1: {}", counter);

    // Part 2
    let mut counter = 0;

    let lines: Vec<String> = contents.lines().map(|s| String::from(s)).collect();
    let chunks = lines.chunks(3);

    for chunk in chunks {
        let flat: Vec<usize> = chunk.iter()
            .flat_map(|c| c.split_whitespace())
            .map(|s: &str| s.parse::<usize>().unwrap())
            .collect();
        for i in 0..3 {
            let mut triple = flat.iter()
                .skip(i)
                .step_by(3);

            let s1 = *triple.next().unwrap();
            let s2 = *triple.next().unwrap();
            let s3 = *triple.next().unwrap();

            if s1 + s2 > s3
                && s2 + s3 > s1
                && s1 + s3 > s2 {
                counter += 1;
            }
        }
    }

    println!("Part 2: {}", counter);
}

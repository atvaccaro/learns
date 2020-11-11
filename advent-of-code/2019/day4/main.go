package day4

import "math"

func extractNth(n int, nth int) int {
	digits := int(math.Log10(float64(n)))
	return n / int(math.Pow10(digits - nth))
}

func main() {
	total := 0
	for n := 138307; n <= 654504; n++ {
		adjacent := false

		for i := 0; i <= 4; i++ {
			a := extractNth(n, i)
			b := extractNth(n, i+1)

			if a == b {
				adjacent = true
			}
		}

		if adjacent {
			total++
		}
	}
}

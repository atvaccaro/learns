package day4

import (
	"testing"
	"fmt"
)

func TestExtractNth(t *testing.T) {
	tests := []struct {
		n, nth int
		want int
	}{
		{10, 0, 1},
		{11, 0, 1},
		{38, 1, 8},
		{3889, 3, 9},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d,%d", tt.n, tt.nth)
		t.Run(testname, func(t *testing.T) {
			ans := extractNth(tt.n, tt.nth)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
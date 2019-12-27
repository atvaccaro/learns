import Enum

defmodule Fuel do
  def fuel(m, recurse \\ true) do
    f = Kernel.trunc(m / 3) - 2
    t = if recurse and f > 5 do
      f + fuel(f, recurse)
    else
      f
    end
    t
  end
end

input = File.read!("input.txt")
        |> String.split(",")
        |> map(fn s -> String.to_integer(s) end)

total1 = input
         |> map(fn m -> Fuel.fuel(m, false) end)
         |> reduce(0, &(&1 + &2))
         |> Integer.to_string

IO.puts("#{total1}")


total2 = input
         |> map(&Fuel.fuel/1)
         |> reduce(0, &(&1 + &2))

IO.puts("#{total2}")
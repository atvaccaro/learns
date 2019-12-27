import Enum
import List

defmodule Intcode do
  def step(l, pos \\ 0) do
    op = at(l, pos)
    cond do
      op == 99 ->
        at(l, 0)
      op == 1 ->
        replace_at(l, at(l, pos + 3), at(l, pos + 1) + at(l, pos + 2))
        |> step(pos + 4)
      op == 2 ->
        replace_at(l, at(l, pos + 3), at(l, pos + 1) * at(l, pos + 2))
        |> step(pos + 4)
    end
  end
end

input = File.read!("input.txt")
        |> String.split(",")
        |> map(fn s -> String.to_integer(s) end)
        |> replace_at(1, 12)
        |> replace_at(2, 2)

IO.puts(Intcode.step(input))
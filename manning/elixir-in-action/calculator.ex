defmodule Calculator do
  def sum(a) do
    sum(a, 0)
  end

  def sum(a, b) do
    a + b
  end

  def sum_with_defaults(a, b \\ 0) do
    a + b
  end

  defp sum_not_exported(a, b) do
    a + b
  end
end

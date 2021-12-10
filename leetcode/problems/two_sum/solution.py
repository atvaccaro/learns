class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        available = {}
        
        for i, n in enumerate(nums):
            need = target - n
            if need in available:
                return [available[need], i]
            available[n] = i

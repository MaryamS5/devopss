import unittest
from unittest.mock import patch

# Function under test (assumed to be in same file or properly imported)
def get_valid_salary(prompt):
    try:
        value = float(input(prompt).strip())
        if 1 <= value <= 1000000:
            return value
    except ValueError:
        pass
    return None

class TestGetValidSalary(unittest.TestCase):

    # --------- Valid ECP Test Cases ---------

    @patch('builtins.input', return_value='2000')
    def test_valid_salary_typical(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 2000.0)

    @patch('builtins.input', return_value='1')
    def test_valid_salary_min(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 1.0)

    @patch('builtins.input', return_value='1000000')
    def test_valid_salary_max(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 1000000.0)

    @patch('builtins.input', return_value='345.67')
    def test_valid_salary_decimal(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 345.67)

    # --------- Invalid ECP Test Cases ---------

    @patch('builtins.input', return_value='0')  # below valid range
    def test_invalid_salary_zero(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='-1500')  # negative value
    def test_invalid_salary_negative(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='abc')  # non-numeric
    def test_invalid_salary_non_numeric(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='1000001')  # above max range
    def test_invalid_salary_above_max(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='')  # empty input
    def test_invalid_salary_empty(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='1000usd')  # alphanumeric
    def test_invalid_salary_with_letters(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    # --------- Invalid BVA Test Cases ---------

    @patch('builtins.input', return_value='0.99')  # just below min
    def test_bva_salary_just_below_min(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    @patch('builtins.input', return_value='1000000.01')  # just above max
    def test_bva_salary_just_above_max(self, mock_input):
        self.assertIsNone(get_valid_salary("Enter salary: "))

    # --------- Valid BVA Test Cases ---------

    @patch('builtins.input', return_value='1.0')  # exactly at lower boundary
    def test_bva_salary_exact_min(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 1.0)

    @patch('builtins.input', return_value='999999.99')  # just below upper boundary
    def test_bva_salary_just_below_max(self, mock_input):
        self.assertEqual(get_valid_salary("Enter salary: "), 999999.99)

if __name__ == "__main__":
    unittest.main()

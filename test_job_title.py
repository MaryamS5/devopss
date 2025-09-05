import unittest
from unittest.mock import patch

# Function to be tested (assumed to be in the same file or properly imported)
def get_valid_job_title(prompt):
    value = input(prompt).strip()
    
    # Check if the job title is at least 3 characters, contains only letters and spaces
    if len(value) >= 3 and all(c.isalpha() or c.isspace() for c in value):
        return value
    return None

class TestGetValidJobTitle(unittest.TestCase):

    # --------- Valid ECP Test Cases ---------

    @patch('builtins.input', return_value='SoftwareEngineer')
    def test_valid_job_title_typical(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "SoftwareEngineer")

    @patch('builtins.input', return_value='CEO')
    def test_valid_job_title_minimum(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "CEO")

    @patch('builtins.input', return_value=' Software Engineer')
    def test_valid_job_title_with_leading_space(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "Software Engineer")

    # --------- Invalid ECP Test Cases ---------

    @patch('builtins.input', return_value='12345')  # contains number
    def test_invalid_job_title_contains_number(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='%$%$^')  # contains special characters
    def test_invalid_job_title_contains_special_characters(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='hr')  # fewer than 3 characters
    def test_invalid_job_title_fewer_than_3_chars(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='   ')  # only spaces
    def test_invalid_job_title_only_spaces(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='')  # empty input
    def test_invalid_job_title_empty_input(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    # --------- BVA Test Cases ---------

    @patch('builtins.input', return_value='it')  # just below minimum length
    def test_bva_job_title_just_below_min(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='ceo')  # exactly at minimum length
    def test_bva_job_title_at_min(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "ceo")

    @patch('builtins.input', return_value='boss')  # just above minimum length
    def test_bva_job_title_just_above_min(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "boss")

    @patch('builtins.input', return_value='7854')  # contains digits
    def test_bva_job_title_contains_digits(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='#$^#^%$%')  # contains special characters
    def test_bva_job_title_contains_symbols(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='   ')  # only spaces
    def test_bva_job_title_only_spaces(self, mock_input):
        self.assertIsNone(get_valid_job_title("Enter job title: "))

    @patch('builtins.input', return_value='Software Engineer')  # valid with space between words
    def test_bva_job_title_with_space_between_words(self, mock_input):
        self.assertEqual(get_valid_job_title("Enter job title: "), "Software Engineer")

if __name__ == "__main__":
    unittest.main()

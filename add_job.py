import re
VALID_JOB_TYPES = {"full-time", "part-time", "internship", "contract", "remote", "freelance"}
def is_alpha_space(value):
    return re.fullmatch(r"[A-Za-z\s]+", value) is not None
def get_valid_input(prompt, min_length=3):
    value = input(prompt).strip()
    if len(value) < min_length or not is_alpha_space(value):
        return None
    return value
def get_valid_description(prompt):
    desc = input(prompt).strip()
    word_count = len(desc.split())
    if word_count < 20 or len(desc) < 100:
        return None
    if not re.match(r"^[A-Za-z0-9\s,.;!?'-]+$", desc):
        return None    
    word_set = set(desc.split())
    if len(word_set) < word_count / 2:
        return None
    return desc
def get_valid_salary(prompt):
    value = input(prompt).strip()
    try:
        salary = float(value)
        if salary > 0 and salary <= 1_000_000:
            return salary
        return None
    except ValueError:
        return None
def get_valid_job_type(prompt):
    value = input(prompt).strip().lower()
    return value if value in VALID_JOB_TYPES else None
def add_job(job_title, company_name, job_description, location, salary, job_type, errors):
    if errors:
        print("\nErrors found:")
        for error in errors:
            print(f"- {error}")
        return False  
    else:
        print("\nJob posted successfully!\n")
        print("Job Details:")
        print(f"• Title       : {job_title}")
        print(f"• Company     : {company_name}")
        print(f"• Description : {job_description}")
        print(f"• Location    : {location}")
        print(f"• Salary      : {salary}")
        print(f"• Type        : {job_type.title()}")
        return True  
def collect_job_details():
    print("\n=== Add New Job ===")
    errors = []
    job_title = get_valid_input("Enter job title: ")
    if not job_title:
        errors.append("Job title must be at least 3 characters, alphabets and spaces only.")
    company_name = get_valid_input("Enter company name: ")
    if not company_name:
        errors.append("Company name must be at least 3 characters, alphabets and spaces only.")
    job_description = get_valid_description("Enter job description (min 20 words, 100 characters): ")
    if not job_description:
        errors.append("Job description must be at least 20 words and 100 characters, with valid characters.")
    location = get_valid_input("Enter location: ")
    if not location:
        errors.append("Location must be at least 3 characters, alphabets and spaces only.")
    salary = get_valid_salary("Enter salary: ")
    if salary is None:
        errors.append("Salary must be a positive number not exceeding 1,000,000.")
    job_type = get_valid_job_type("Enter job type (Full-time, Part-time, Internship, Contract, Remote, Freelance): ")
    if not job_type:
        errors.append("Job type must be one of: Full-time, Part-time, Internship, Contract, Remote, Freelance.")
    return add_job(job_title, company_name, job_description, location, salary, job_type, errors)
# Main loop
while True:
    success = collect_job_details()
    if success:
        break
    print("\nPlease correct the above errors and try again.")    
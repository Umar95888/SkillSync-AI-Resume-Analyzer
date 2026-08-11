"""SkillSync Interview Question Generator."""

INTERVIEW_QUESTIONS = {
    'Python': [
        'What is the difference between a list and a tuple?',
        'What are decorators in Python?',
        'What are generators?',
        'What is shallow copy vs deep copy?',
        'Explain *args and **kwargs.',
        'What is exception handling?',
        'What are lambda functions?',
        'What is list comprehension?',
        'What are mutable and immutable objects?',
        'What is the Python GIL?'
    ],
    'C++': [
        'What is the difference between C and C++?',
        'What are classes and objects?',
        'What are the four pillars of OOP?',
        'What is inheritance?',
        'What is polymorphism?',
        'What is a pointer vs a reference?',
        'What are constructors and destructors?',
        'What is function overloading?',
        'What is operator overloading?',
        'What is stack vs heap memory?'
    ],
    'Java': [
        'What are the four pillars of OOP?',
        'What are JDK, JRE and JVM?',
        'What is method overloading?',
        'What is method overriding?',
        'What is exception handling?',
        'Interface vs abstract class?',
        'What is inheritance?',
        'What is == vs equals()?',
        'What is garbage collection?',
        'What are Java access modifiers?'
    ],
    'JavaScript': [
        'What is hoisting?',
        'What is var vs let vs const?',
        'What are closures?',
        'What are promises?',
        'What is async/await?',
        'What is == vs ===?',
        'What is the event loop?',
        'What is null vs undefined?',
        'What are arrow functions?',
        'What is event bubbling?'
    ],
    'TypeScript': [
        'What is TypeScript?',
        'TypeScript vs JavaScript?',
        'What are interfaces?',
        'What are type aliases?',
        'What are generics?',
        'What is type inference?',
        'What are union and intersection types?',
        'What is an enum?',
        'What is optional chaining?',
        'How does TypeScript help large projects?'
    ],
    'HTML': [
        'What are semantic HTML elements?',
        'div vs span?',
        'What is DOCTYPE?',
        'How do HTML forms work?',
        'id vs class?',
        'What are HTML attributes?',
        'Block vs inline elements?',
        'What is the meta viewport tag?',
        'How can HTML be made accessible?',
        'What is localStorage vs sessionStorage?'
    ],
    'CSS': [
        'What is the CSS box model?',
        'Flexbox vs Grid?',
        'Relative vs absolute positioning?',
        'What are media queries?',
        'What are pseudo-classes and pseudo-elements?',
        'What is CSS specificity?',
        'em vs rem vs percentage vs px?',
        'display:none vs visibility:hidden?',
        'What is responsive design?',
        'What are CSS variables?'
    ],
    'React': [
        'What are React components?',
        'What are React Hooks?',
        'Explain useState().',
        'Explain useEffect().',
        'State vs props?',
        'What is the Virtual DOM?',
        'What is Context API?',
        'Why are keys used in lists?',
        'What is conditional rendering?',
        'Controlled vs uncontrolled components?'
    ],
    'Next.js': [
        'What is Next.js?',
        'React vs Next.js?',
        'What is server-side rendering?',
        'What is static site generation?',
        'What is file-based routing?',
        'What are API routes?',
        'What is client-side rendering?',
        'What is the Next.js Image component?',
        'What is middleware?',
        'What are Server Components?'
    ],
    'Angular': [
        'What is Angular?',
        'What are Angular components?',
        'What are Angular services?',
        'What is dependency injection?',
        'What are directives?',
        'What is data binding?',
        'What are pipes?',
        'What is the component lifecycle?',
        'What is RxJS used for?',
        'What is Angular routing?'
    ],
    'Node.js': [
        'What is Node.js?',
        'Why use Node.js for backend development?',
        'What is the event loop?',
        'What is npm?',
        'What is asynchronous programming?',
        'What are Node.js modules?',
        'require vs import?',
        'How does Node.js handle I/O?',
        'What are streams?',
        'How do you handle errors?'
    ],
    'Express.js': [
        'What is Express.js?',
        'What is middleware?',
        'How do you create a REST API?',
        'What is routing?',
        'How do you handle errors?',
        'What are route parameters?',
        'app.use() vs app.get()?',
        'How do you enable CORS?',
        'How do you parse JSON bodies?',
        'How can an Express API be secured?'
    ],
    'FastAPI': [
        'What is FastAPI?',
        'Why is FastAPI suitable for APIs?',
        'What is Pydantic?',
        'How do you create an endpoint?',
        'What is dependency injection?',
        'How do you validate request data?',
        'What is an async endpoint?',
        'How do you handle file uploads?',
        'Path vs query parameters?',
        'How does FastAPI generate API documentation?'
    ],
    'Flask': [
        'What is Flask?',
        'How do you create a route?',
        'What is a Flask application?',
        'How do you handle GET and POST?',
        'What are Flask blueprints?',
        'How do you handle errors?',
        'What is Flask middleware?',
        'How do you return JSON?',
        'How do you configure Flask?',
        'Flask vs Django?'
    ],
    'Django': [
        'What is Django?',
        'Explain Django MVT.',
        'What is Django ORM?',
        'What are Django models?',
        'What is Django middleware?',
        'What are Django views?',
        'What are Django templates?',
        'What is Django Admin?',
        'What are migrations?',
        'How does Django authentication work?'
    ],
    'SQL': [
        'What is SQL?',
        'DELETE vs DROP vs TRUNCATE?',
        'Explain JOIN types.',
        'What is normalization?',
        'Primary key vs foreign key?',
        'What is an index?',
        'WHERE vs HAVING?',
        'What is a subquery?',
        'What is a transaction?',
        'Write a query for the second highest salary.'
    ],
    'MySQL': [
        'What is MySQL?',
        'MySQL vs SQL?',
        'What are indexes?',
        'What are primary and foreign keys?',
        'What is a stored procedure?',
        'What are constraints?',
        'CHAR vs VARCHAR?',
        'What is a transaction?',
        'INNER JOIN vs LEFT JOIN?',
        'How can a MySQL query be optimized?'
    ],
    'PostgreSQL': [
        'What is PostgreSQL?',
        'PostgreSQL vs MySQL?',
        'What are schemas?',
        'What are indexes?',
        'What are transactions?',
        'What is a view?',
        'What are constraints?',
        'What is JSONB?',
        'What is a PostgreSQL sequence?',
        'How can PostgreSQL queries be optimized?'
    ],
    'MongoDB': [
        'What is MongoDB?',
        'What is BSON?',
        'Collection vs document?',
        'Explain aggregation.',
        'find() vs aggregate()?',
        'What are indexes?',
        'Embedding vs referencing?',
        'What is MongoDB Atlas?',
        'What is a replica set?',
        'When would you choose MongoDB over a relational database?'
    ],
    'Git': [
        'What is Git?',
        'Git vs GitHub?',
        'What is git commit?',
        'What is git merge?',
        'What is git rebase?',
        'git fetch vs git pull?',
        'What is git stash?',
        'What is a Git branch?',
        'How do you resolve a merge conflict?',
        'What is .gitignore?'
    ],
    'GitHub': [
        'What is GitHub?',
        'What is a GitHub repository?',
        'What is a pull request?',
        'What is a GitHub branch?',
        'What are GitHub Actions?',
        'What is a GitHub issue?',
        'What is a fork?',
        'Public vs private repositories?',
        'How do you protect a branch?',
        'How do you collaborate on GitHub?'
    ],
    'Docker': [
        'What is Docker?',
        'Docker image vs container?',
        'What is a Dockerfile?',
        'What is Docker Compose?',
        'Why use Docker?',
        'What is a Docker volume?',
        'What is a Docker network?',
        'What is Docker Hub?',
        'How do you reduce image size?',
        'How do you expose a port?'
    ],
    'Kubernetes': [
        'What is Kubernetes?',
        'What is a Pod?',
        'What is a Deployment?',
        'What is a Service?',
        'What is a Namespace?',
        'What is a ConfigMap?',
        'What is a Secret?',
        'What is horizontal pod autoscaling?',
        'What is a Kubernetes cluster?',
        'Why use Kubernetes with containers?'
    ],
    'Linux': [
        'What is Linux?',
        'Linux vs Windows?',
        'What are Linux file permissions?',
        'What does chmod do?',
        'What are common Linux commands?',
        'Process vs thread?',
        'What is a Linux shell?',
        'What is sudo?',
        'How do you search for files?',
        'How do you check running processes?'
    ],
    'AWS': [
        'What is AWS?',
        'What is EC2?',
        'What is S3?',
        'What is IAM?',
        'What is AWS Lambda?',
        'What is Amazon RDS?',
        'What is a VPC?',
        'What is CloudFront?',
        'EC2 vs Lambda?',
        'How can an application be deployed on AWS?'
    ],
    'Azure': [
        'What is Microsoft Azure?',
        'What is an Azure Virtual Machine?',
        'What is Blob Storage?',
        'What is Azure Active Directory?',
        'What is Azure Functions?',
        'What is Azure App Service?',
        'What is an Azure Resource Group?',
        'What is Azure SQL Database?',
        'What is Azure Virtual Network?',
        'Azure vs AWS?'
    ],
    'Machine Learning': [
        'What is Machine Learning?',
        'Supervised vs unsupervised learning?',
        'What is overfitting?',
        'What is underfitting?',
        'What is train-test split?',
        'What is feature engineering?',
        'What is cross-validation?',
        'What are precision and recall?',
        'What is the bias-variance tradeoff?',
        'How do you evaluate a machine learning model?'
    ],
    'Deep Learning': [
        'What is Deep Learning?',
        'What is a neural network?',
        'What is an activation function?',
        'What is backpropagation?',
        'What is a loss function?',
        'What is gradient descent?',
        'What is a convolutional neural network?',
        'What is a recurrent neural network?',
        'What is dropout?',
        'Machine Learning vs Deep Learning?'
    ],
    'NLP': [
        'What is Natural Language Processing?',
        'What is tokenization?',
        'What is stemming?',
        'What is lemmatization?',
        'What is TF-IDF?',
        'What are word embeddings?',
        'What is named entity recognition?',
        'What is sentiment analysis?',
        'What is text classification?',
        'How is NLP different from traditional text processing?'
    ],
    'TensorFlow': [
        'What is TensorFlow?',
        'What is a TensorFlow tensor?',
        'What is Keras?',
        'How do you create a neural network?',
        'What is model.fit()?',
        'What is an optimizer?',
        'What is a loss function?',
        'How do you save a TensorFlow model?',
        'What is GPU acceleration?',
        'How do you evaluate a TensorFlow model?'
    ],
    'PyTorch': [
        'What is PyTorch?',
        'What is a tensor?',
        'What is autograd?',
        'What is a PyTorch Dataset?',
        'What is a DataLoader?',
        'How do you define a neural network?',
        'What is an optimizer?',
        'How do you save a model?',
        'What is GPU acceleration?',
        'PyTorch vs TensorFlow?'
    ],
    'Scikit-learn': [
        'What is Scikit-learn?',
        'What is train_test_split()?',
        'What is cross-validation?',
        'What is preprocessing?',
        'How do you evaluate a classification model?',
        'How do you evaluate a regression model?',
        'What is a pipeline?',
        'What is GridSearchCV?',
        'What is feature scaling?',
        'How do you handle missing data?'
    ],
    'Pandas': [
        'What is Pandas?',
        'What is a DataFrame?',
        'What is a Series?',
        'loc vs iloc?',
        'How do you handle missing values?',
        'How do you merge DataFrames?',
        'How does groupby() work?',
        'How do you sort a DataFrame?',
        'How do you read a CSV?',
        'How do you remove duplicates?'
    ],
    'NumPy': [
        'What is NumPy?',
        'What is a NumPy array?',
        'What is vectorization?',
        'What is broadcasting?',
        'Why is NumPy faster than Python lists for numerical operations?',
        'What is array reshaping?',
        'NumPy array vs Python list?',
        'What are NumPy aggregation functions?',
        'How do you perform matrix multiplication?',
        'How do you handle invalid numerical values?'
    ]
}


def generate_questions(skills):
    """Return 10 questions for every detected skill."""
    result = []

    for skill in skills:
        if skill in INTERVIEW_QUESTIONS:
            skill_questions = INTERVIEW_QUESTIONS[skill]
        else:
            skill_questions = [
                f"What is {skill}?",
                f"What are the main features of {skill}?",
                f"What are the common use cases of {skill}?",
                f"What are the advantages of {skill}?",
                f"What are the limitations of {skill}?",
                f"How is {skill} used in real-world projects?",
                f"What are common problems when using {skill}?",
                f"What are best practices for using {skill}?",
                f"How would you explain {skill} to a beginner?",
                f"Describe a project where {skill} could be used."
            ]

        result.append({
            "skill": skill,
            "questions": skill_questions
        })

    return result

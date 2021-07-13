export function add_to_code(code: string, type: string): string {
  if (code.trim() === '') {
    code += default_code(true, type);
  } else {
    code += '\n\n\n' + default_code(false, type);
  }

  return code.trim();
}

export function set_header(code: string, options = {}): string {
  // remove header if exists
  code = code.replace(/---[^-]*?---/, '').trim();

  // create new header
  let header = '---\n';
  for (var prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      header = header.concat(prop, ': ', options[prop], '\n');
    }
  }
  header = header.concat('---\n\n');
  return header.concat(code);
}

export function default_code(
  with_header: boolean = false,
  type: string = 'multiple-choice'
) {
  let body: string;

  switch (type) {
    case 'multiple-choice':
      body = `
# Python Lists

What is the value of \`x[2]\`?

> Python lists are mutable!

\`\`\`python
x = [2, 3, 4]
x[2] = 4
print(x[2])
\`\`\`

- [ ] 1
- [ ] 2
- [ ] 3
- [x] 4`;
      break;
    case 'single-choice':
      body = `

# What is the capital of Germany? 

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Siegessaeule_Aussicht_10-13_img4_Tiergarten.jpg/405px-Siegessaeule_Aussicht_10-13_img4_Tiergarten.jpg)

> It's the largest city in Germany!         

1. [ ] Frankfurt
1. [x] Berlin
1. [ ] Hamburg
1. [ ] Munich`;

      break;
    case 'sequence':
      body = `
# Put the [days](https://en.wikipedia.org/wiki/Day) in order!

Quizdown also renders formulas:

$$
x = \\frac{a+b^2}{\\sqrt{b+c}}
$$

> Monday is the *first* day of the week.

1. Monday
2. Tuesday
3. Wednesday
4. Friday
5. Saturday`;
      break;
    default:
      body = default_code(with_header, type);
      break;
  }
  if (with_header) {
    return set_header(body.trim(), {
      primaryColor: 'steelblue',
      secondaryColor: "'#e8e8e8'",
      textColor: 'black',
      shuffleQuestions: false,
      shuffleAnswers: true,
      locale: 'en'
    });
  } else {
    return body.trim();
  }
}

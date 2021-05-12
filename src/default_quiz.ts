export function add_to_code(code:string, type:string): string {
    if (code.trim()===''){
        code += default_code(true, type)
    } else {
        code += '\n\n\n' + default_code(false, type)
    }
    return code.trim();
}

export function set_header(code:string, options={}): string {
    // remove header if exists
    code = code.replace(/---[^-]*?---/, "").trim();

    // create new header
    let header = '---\n';
    for (var prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            header = header.concat(prop, ": ", options[prop], "\n")            
        }
    }
    header = header.concat('---\n\n')
    return header.concat(code);
}


export function default_code(with_header:boolean=false, type:string='multiple-choice'){
    let body: string;   

    switch (type) {
        case 'multiple-choice':
            body = `
# The sound of dog

What do dogs sound like?

> Some hint

\`\`\`python
class Dog(Animal):
    def __init__(self, name):
        self.name = name
\`\`\`

- [ ] yes
- [ ] no
- [ ] \`self.sound = "meow"\`
- [x] wuff`
            break;
        case 'single-choice':
            body = `

# What is the capital of Germany?      

> It's the largest city in Germany!         

1. [ ] Frankfurt
1. [x] Berlin
1. [ ] Hamburg
1. [ ] Munich`
            break;
        case 'sequence':
            body = `
# Put the [days](https://en.wikipedia.org/wiki/Day) in order!

> Monday is the *first* day of the week.

1. Monday
2. Tuesday
3. Wednesday
4. Friday
5. Saturday`
            break;       
        default:
            body = default_code(with_header, type)
            break;
    }
    if (with_header){
        return set_header(body.trim(), {
            primary_color:'steelblue',
            secondary_color:'\'#e8e8e8\'',
            text_color: 'black',
            shuffle_questions: false,
            shuffle_answers: true,
            locale: 'en'
        });
    } else {
        return body.trim()
    }    
}

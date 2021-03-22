export function default_code(type?:string){
    let output: string;
    switch (type) {
        case 'multiple-choice':
            output = `
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
            output = `
# What is the capital of Germany?      

> It's the largest city in Germany!         

1. [ ] Frankfurt
1. [x] Berlin
1. [ ] Hamburg
1. [ ] Munich`
            break;
        case 'sequence':
            output = `
# Put the [days](https://en.wikipedia.org/wiki/Day) in order!

> Monday is the *first* day of the week.

1. Monday
2. Tuesday
3. Wednesday
4. Friday
5. Saturday`
            break;       
        default:
            output = default_code('multiple-choice')
            break;
    }
    return output.trim();
}

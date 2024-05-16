const names: string[] = ["eko", "budi", "joko"];

for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
    
}

for (const name of names) {
    console.log(name);
}

for (const index in names) {
    console.log(names[index]);
}
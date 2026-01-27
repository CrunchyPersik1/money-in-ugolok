with open('game_patched.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Извлекаем CSS
css_start = content.find('<style>') + 7
css_end = content.find('</style>')
css_content = content[css_start:css_end]

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# Извлекаем JavaScript
js_start = content.find('<script>') + 8
js_end = content.find('</script>')
js_content = content[js_start:js_end]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Files extracted successfully!")

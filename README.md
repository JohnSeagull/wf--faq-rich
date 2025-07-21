# FAQ Generator for Webflow Rich Text

## [Live Demo](https://ivnmchn.webflow.io/post/understanding-api-architecture)

> [🇬🇧 **English version below**](#-en)  
> [🇷🇺 **Русская версия ниже**](#-ru)

---

## 🇬🇧 EN — FAQ Generator Overview

This tool helps you easily **generate FAQ sections** that are **optimized for Webflow Rich Text blocks** and **structured with Schema.org markup** for better SEO.

> ⚡ Designed specifically for Webflow — no external dependencies, clean output, ready to paste.

### 🛠 Step-by-step Usage

1. Go to the [FAQ Generator interface](https://johnseagull.github.io/wf--faq-rich/)  
2. Create your FAQ question-answer pairs on the left panel

<img width="1405" height="1511" alt="image" src="https://github.com/user-attachments/assets/85fc5300-cd5f-4cff-baf8-530338bd546b" />

3. Copy the generated HTML from the right panel and paste it inside a **Rich Text** element in Webflow (using Embed or Custom Code block if needed)

<img width="1230" height="1293" alt="image" src="https://github.com/user-attachments/assets/e1263535-2d25-499d-bb20-0a4d1a9f0c80" />

4. Copy the contents or link of [`webflow-rich-faq.css`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.css) and add it to the **head** of your Webflow page  
5. Copy the contents or link of [`webflow-rich-faq.js`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.js) and add it to the **footer** (before `</body>`) of your Webflow page

<img width="647" height="1220" alt="image" src="https://github.com/user-attachments/assets/ab86215e-64a7-4498-9f17-7d9a3cc6f605" />
 
6. Optionally customize styles by adding your own CSS
7. Test your FAQ markup using the [Schema Markup Validator](https://validator.schema.org/) and the [Google Rich Results Test](https://search.google.com/test/rich-results).

### ✨ Features

- Live interface to add/edit Questions & Answers  
- Auto-generated semantic HTML with Schema.org markup  
- Copy-paste ready for Webflow Rich Text blocks  
- Clean and responsive design  
- Optional CSS & JS enhancements (accordion toggle functionality)

### 📦 Files

| File                   | Purpose                                                           |
|------------------------|-------------------------------------------------------------------|
| [`faq-generator`](https://johnseagull.github.io/wf--faq-rich/)   | FAQ accordion markup generator page                               | 
| [`webflow-rich-faq.css`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.css) | Optional CSS for styling the FAQ section in Webflow               |
| [`webflow-rich-faq.js`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.js)  | Optional JS for accordion toggle functionality inside Webflow     |

### 📄 License

This project is licensed under the MIT License.  
© John The Machine

---

&nbsp;
&nbsp;
## 🇷🇺 RU — Обзор Генератора FAQ

Этот инструмент помогает легко **создавать разделы FAQ**, которые **оптимизированы для Rich Text-блоков Webflow** и **структурированы по стандарту Schema.org** для улучшенного SEO.

> ⚡ Специально создан для Webflow — без внешних зависимостей, чистая и готовая разметка.

### 🛠 Пошаговое использование

1. Перейдите на [страницу генератора FAQ](https://johnseagull.github.io/wf--faq-rich/)  
2. Создайте пары вопрос-ответ в левой панели

<img width="1405" height="1511" alt="image" src="https://github.com/user-attachments/assets/9f40ac12-95f5-4347-8db6-ef193cb88458" />

3. Скопируйте сгенерированный HTML из правой панели и вставьте его в **Rich Text** элемент в Webflow (через Embed или Custom Code при необходимости)

<img width="1230" height="1293" alt="image" src="https://github.com/user-attachments/assets/6e79157a-aa81-4d3e-9d8d-0e99015d6282" />

4. Скопируйте содержимое или ссылку на [`webflow-rich-faq.css`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.css) и добавьте в **head** страницы Webflow  
5. Скопируйте содержимое или ссылку на [`webflow-rich-faq.js`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.js) и добавьте в **footer** (перед `</body>`) страницы Webflow

<img width="647" height="1220" alt="image" src="https://github.com/user-attachments/assets/38bf3056-a95e-4f1a-9fc6-918aec1fac55" />

6. При желании, дополнительно стилизуйте свой FAQ с помощью собственного CSS
7. Протестируйте свою разметку FAQ на [Schema Markup Validator](https://validator.schema.org/) и на [Google Rich Results Test](https://search.google.com/test/rich-results).

### ✨ Возможности

- Удобный интерфейс для добавления и редактирования вопросов/ответов  
- Автоматическая генерация семантического HTML с разметкой Schema.org  
- Готовый к вставке код для Rich Text-блока Webflow  
- Чистый адаптивный дизайн  
- Дополнительные CSS и JS для работы аккордеона внутри Webflow

### 📦 Файлы

| Файл                   | Назначение                                                        |
|------------------------|-------------------------------------------------------------------|
| [`faq-generator`](https://johnseagull.github.io/wf--faq-rich/)   | Страница генератора FAQ разметки аккордеона                      |
| [`webflow-rich-faq.css`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.css) | CSS для оформления FAQ внутри Webflow                            |
| [`webflow-rich-faq.js`](https://github.com/JohnSeagull/wf--faq-rich/blob/main/webflow-rich-faq.js)  | JS для работы аккордеона внутри Webflow                           |

### 📄 Лицензия

Проект распространяется под лицензией MIT.  
© John The Machine

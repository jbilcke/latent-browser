# Prompting guide 1 (2023-01-14)

## General prompting tips

### quick VS full prompt

The Latent Browser is a new exciting way to prompt content, however it comes with limitations.

#### Quick prompt (aka the "search engine")

In order to make the latent web accessible to the masses I've added a search engine which tries to guess what you want, and when it is too ambiguous suggest a variety of topics.

What this search engine actually does is that it generates "full prompts" (see below).

This quick prompting mode can work with only a few words, but it is limited. You can try to add more words and even full sentences, but if you want to achieve anything meaningul you will want to use the "full" prompt mode.

#### Full prompt (aka the "prompt bar")

The address bar is where the real prompting is happening, and this is what this guide will help you to write.

Please note however that you are helped: anything you type in the prompt bar will be boosted by a first analysis step, before being fed to the latent server (the LLM).

### State what you want

The language model cannot read in your mind so if you want something say it: 2 paragraphs, 20 lines, multiple images..

In some case the browser will try to determine if adding more content is a good call, but ultimately I had to make it "neutral" and not too opinionated.

### Remove the lorem ipsum

In some cases the LLM may generate text in Latin, using the favorite latin placeholder of the web.

I've added some countermeasures to prevent this such as prompt instructions, examples, and special logit biases.

But if that happens to you try to generate again or add "in English" to your prompt.

## Generating web pages

### Generating micro sites and blogs

```
a blog about a carpenter building a dog, who becomes alive.
It features multiple sections, with multiple lines per paragraph.
```

### Generating fantasy websites

(TODO)

### Generating corpo websites

(TODO)

### Generating communities

(TODO)

## Generating web applications

(TODO)

## Generating non-web content

### Generating PDF files

Thanks to the PDF plugin you can also generate PDF documents, such as simple report pages, poems, stories..

#### Examples

```
a book about an obscure wizard called Vermor, it explains how to create an invisibility potion in multiple paragraphs
```

### Generating music (sort of)

Generating music is still experimental, and let's be honest, it will sound a bit crude (like a game from the 1980s).

I would happily integrate techs such as Riffusion, if you can create a plugin!
Maybe I will even add one myself as this would be pretty cool.

#### Examples

```
 a small site about an obscure German composer called Franz Openhai, it feature a small song long of 6 beautiful chords, together with lyrics written in english
```

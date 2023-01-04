import { DalleImage } from './types'

/**
 * Mock data used to save $$$ during development
 *
 */

export const html = `
<div>
  <p>Hello, World!</p>
  <p>
    Here's a <a classname="text-blue-800" href="/foobiz.html">link</a>.
  </p>
  <p>
    And <a classname="text-blue-800" href="/donkey.png">another one</a>.
  </p>
  <div>
    One more thing:
    <canvas id="layer-1" />
  </div>
</div>`

export const script = `<script>console.log('Hello, World!')</script>`

let i = 0
export const json = <T>(prefix: string) =>
  (prefix === '['
    ? [
        {
          title: `Hello World (${++i})`,
          subtitle: 'Hello World',
          description: `Hello, World! (${i})`,
        },
      ]
    : {
        Layout: 'A simple HTML-like layout',
        Script: 'Just say Hello, world!',
        'Mouse events': 'Nothing to do',
        'Keyboard events': 'Nothing to do',
      }) as unknown as T

export const image: DalleImage = {
  url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABN1JREFUeF7tm0sofG8Yx7/zQ27JNSILtyIWUspl5bawcVkgiizkEsplIbGUkJIlWUlJLiFRUqxETHJLikRuO7mk3Off8/4zfzO/MXPOnPc9M8z/bGaOOfOc9/N5n+c5zpxejVar1fn5+cHV1RWOtD0/P+Pm5gaak5MTHb2JioqCt7e3Qzi4u7vD8fExaOI1l5eXOk9PT/YHR5DwCU+sj4+P/woICQnB1w9+ayYYM15dXf0ngHL/N0swxfaXgN8q4buJNSngt0kwl9XfCvgtEiyVtFkBP12CJXjisyjgp0qQAi9ZwE+TIBVeloCfIkEOvGwB9i5BLrxVAuxVgjXwVguwNwnWwisSYC8SlMArFmBrCUrhuQiwlQQe8NwEqC2BFzxXAWpJ4AnPXYBoCbzhhQgQJUEEvDABvCWIghcqgJcEkfDCBSiVIBpeFQHWSlADXjUBciWoBa+qAKkS1IRXXYAlCWrD20TAdxJsAW8zAcYSaN9WzyUl/SpMAxSxfc46xbbVQ9n/BRg/HBUx06Zifq15hysBUw3PYZqgOVBbSFC1B0gBlHIMzzJVTYAcMDnHKpWhigBrgKz5jjUyhAtQAqLku1JlCBXAA4BHDHMyhAngOXCesYxlCBEgYsAiYgq5GRI1UEu30lJrXmgGiIT/HDjvc3ArAd4DMzejPM/FRQDPAUlNZV7nVCyA10Ckgn89jse5FQngMQBrwHlKsFqAPcDzaIxWCbAneKUSZAuwR3glEmQJ4Al/f3+Pw8NDREREICAgwGQrWF9fR0xMDHx8fCS1Coqp1Wqh0+mQmJhocvmPcUzJAnjCt7S0oLe3Vw81Pj6OwsJCA8ixsTGUlJRgeXkZ6enpFgUYx+zu7kZNTY2BBFMxJQngCU9AmZmZWFpaQnx8PBobG7G/v4+dnR095OnpKcLDw9m+FAGmYlK84eFh/c/t38W0KIAnPAHl5ubiz58/mJmZYYDX19eYn59HeXk5XFxc8Pb2hrS0NMTGxmJoaEgvoL29HZubm5iamoKXlxf7bHR0FJQ9FRUVJmPm5+fj7OwMYWFhyMvL+yumxZsh3vB0wsjISGRlZYHq9fz8HAUFBSzVg4KCmJDOzk4Gtrq6Cl9fX72Ai4sLBkCi6uvrWW/o7+9HQ0OD2ZjE0NbWxuKsra0ZxDQrQAQ8LVR0c3NjoM3NzQgMDERfXx9rcru7u9je3kZycjJ7Hx0dzRZyfi2BiYkJFBUVITQ0FHFxcVhYWMDr66ukmFT/GRkZ7JxfY6q6aOrp6Qnu7u4oLS3FyMgIE7GyssIGtrW1xbKB+gI1r5eXF+Tk5KCrq4u9EjBt9HpwcMCOT0hIgNSYZWVlrByampoMYqq+bI5SvaqqCh0dHQyIZpugNzY2UFdXp2+E7+/vDJIuk5WVlWhtbcXk5CS7WtAsJiUlYXZ2FhqNhpWPlJgklZoj9YTq6moW00CAiLQ3vn7R5Yq68/T0NIOj/cXFRVCXpuz43D4+PuDk5KRPVxoo1X1tbS2ouaWkpGBwcJCBy405MDCA4uJidonUC1Br6ezt7S0rAer8tNFskozU1FQDV8YCsrOzcXR0hL29PXh4eLDZ6+npYY/V/f39ZcWcm5tDcHAwu0SypbO2WDx9eXmJh4cHNghnZ2eL/+hIOUBOzM9sZ4unHX35/D9MBM5MitS2vQAAAABJRU5ErkJggg==',
  prompt: 'blob',
  width: 64,
  height: 64,
}

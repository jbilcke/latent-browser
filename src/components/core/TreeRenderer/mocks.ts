export const mockTreeString = `- "ui.page⎛primary≋#000000߷secondary≋#666666߷fg≋#ffffff߷bg≋#cccccc߷accent≋#ff0000":
- "fl.sidebar⎛":
  - "fl.sidebar_item⎛icon≋home߷Home"
  - "fl.sidebar_item⎛icon≋info߷Interesting Facts"
  - "fl.sidebar_item⎛icon≋globe߷Migration"
  - "fl.sidebar_item⎛icon≋egg߷Eggs & Chicks"
  - "fl.sidebar_item⎛icon≋family߷Mating & Parenting"
- "ui.content⎛":
  - "fl.navbar⎛fluid≋true߷rounded≋true":
    - "fl.button⎛Home"
    - "fl.button⎛About"
  - "ui.h2⎛Welcome To Duck Blog!"
  - "ui.p⎛Welcome to my blog about ducks! Here, you will find all the necessary information about ducks, from the basics of a duck's life cycle to its migration habits, mating rituals, and parenting techniques. It will be filled with fun facts, stories, and anecdotes about ducks in an interesting, yet informative style. So, come join us and let's explore the beautiful and fascinating world of ducks together!"
  - "fl.plans⎛":
    - "fl.plan⎛price≋$39߷label≋standard"
    - "fl.plan⎛price≋$89߷label≋pro"
    - "fl.plan⎛price≋$149߷label≋enterprise"
  - "fl.testimonial⎛author≋Some Customer߷bio≋Executive Assistant߷caption≋photo of an average executive assistant, working on a computer, bokeh߷quote≋For me time is money, and TimeWatch changed my life."
  - "fl.feats⎛title≋Swiss German design.߷subtitle≋Your TimeWatch will truly be your companion for life.":
    - "fl.feat⎛icon≋clock߷title≋Predict the future߷Predict the future, not the past. With the new TimeWatch you see what's coming see up to 2 days in advance. Pro users can see up to 7+ weeks."
    - "fl.feat⎛icon≋microscope߷title≋Incredible quality߷Made in the Swiss Alps our TimeWatch has been tested in deep space, on Mars, in the New York subway and in a wormhole. It truly passes the trial of time."
    - "fl.feat⎛icon≋health߷title≋SaveMyLife+߷Our special life insurance program! If you get injured our TimeSquad will travel back to time to save you. Don't worry, you will have no recollection of the event."
  - "ui.slider⎛height≋700px":
    - "co.image⎛egg, Canon EOS | Sigma 85mm f/8"
    - "co.image⎛duckling, Nikon D810 | ISO 64 | focal length 20mm | Aperture f/9 | Exposure Time 1/40 Sec"
    - "co.image⎛duck, bright lights, canon EOS | Sigma 85mm f/8"
    - "co.image⎛map of migration route"
  - "ui.h2⎛Test Your Knowledge Of Ducks With This Quiz!"
  - "ui.p⎛We have created a fun and interactive quiz to test your knowledge about ducks! It will be split into sections, such as interesting facts, migration, eggs & chicks, and mating & parenting. Each section will have multiple-choice questions, and upon completion, you will be provided with a final score. So, go ahead and give it a try!"
  - "co.js⎛⎝$score = 0⎞"
  - "co.js⎛⎝$questions = [
      {
          question: 'What is the average lifespan of a duck?',
          answers: [
              { answer: '3 years', correct: false },
              { answer: '5 years', correct: true },
              { answer: '10 years', correct: false }
          ]
      },
      {
          question: 'How long does it take for a duck egg to hatch?',
          answers: [
              { answer: '1 week', correct: false },
              { answer: '2 weeks', correct: true },
              { answer: '3 weeks', correct: false }
          ]
      }
  ]⎞"
  - "fb.scene⎛":
    - "co.js⎛⎝$a = $mouse.clicked ? 2 : 1⎞"
    - "co.js⎛⎝$b = '#ffffff'⎞"
    - "fb.ball⎛size≋⎝$a * 0.25⎞߷color≋⎝$mouse.clicked ? $b : '#ff0000'⎞"
    - "fb.ball⎛size≋⎝$a * 0.5⎞߷color≋⎝$mouse.clicked ? $b : '#00ff00'⎞"
    - "fb.ball⎛size≋⎝$a * 1.0⎞߷color≋⎝$mouse.clicked ? $b : '#0000ff'⎞"
  - "ui.p⎛Your final score is ⎝$score⎞"
  - "fl.footer⎛":
    - "fl.footer_copyright⎛by≋DuckBlog߷year≋2021"
    - "fl.footer_links⎛":
      - "fl.footer_link⎛href≋#߷label≋About"
      - "fl.footer_link⎛href≋#߷label≋Contact"`

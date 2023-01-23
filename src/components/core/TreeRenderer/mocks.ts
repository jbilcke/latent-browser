export const mockTreeString = `- "ui.page⎛pri≋#000000߷sec≋#666666߷fg≋#ffffff߷bg≋#cccccc߷accent≋#ff0000":
  - "fl.sidebar⎛":
    - "fl.sidebar_item⎛i≋home߷Home"
    - "fl.sidebar_item⎛i≋info߷Interesting Facts"
    - "fl.sidebar_item⎛i≋globe߷Migration"
    - "fl.sidebar_item⎛i≋egg߷Eggs & Chicks"
    - "fl.sidebar_item⎛i≋family߷Mating & Parenting"
  - "ui.content⎛":
    - "fl.navbar⎛f≋true߷r≋true":
      - "fl.button⎛Home"
      - "fl.button⎛About"
    - "fl.form⎛":
      - "fl.field⎛t≋number߷i≋num1߷l≋X"
      - "fl.field⎛t≋number߷i≋num2߷l≋Y"
    - "co.js⎛⎝$x = parseInt($('#num1').val() || '0'), $y = parseInt($('#num2').val() || '0'), $z = $x + $y⎞"
    - "ui.p⎛Result: ⎝$z⎞"
    - "ui.h2⎛Welcome To Duck Blog!"
    - "ui.p⎛Welcome to my blog about ducks! Here, you will find all the necessary information about ducks, from the basics of a duck's life cycle to its migration habits, mating rituals, and parenting techniques. It will be filled with fun facts, stories, and anecdotes about ducks in an interesting, yet informative style. So, come join us and let's explore the beautiful and fascinating world of ducks together!"
    - "fl.feats⎛t≋Swiss design.߷s≋Your TimeWatch will truly be your companion for life.":
      - "fl.feat⎛i≋clock߷t≋Predict the future߷Predict the future, not the past. With the new TimeWatch you see what's coming see up to 2 days in advance. Pro users can see up to 7+ weeks."
      - "fl.feat⎛i≋microscope߷t≋Incredible quality߷Made in the Swiss Alps our TimeWatch has been tested in deep space, on Mars, in the New York subway and in a wormhole. It truly passes the trial of time."
      - "fl.feat⎛i≋health߷t≋SaveMyLife+߷Our special life insurance program! If you get injured our TimeSquad will travel back to time to save you. Don't worry, you will have no recollection of the event."
    - "fl.plans⎛":
      - "fl.plan⎛p≋$39߷l≋standard߷base plan with 2 days of future forecasting"
      - "fl.plan⎛p≋$89߷l≋pro߷pro plan with 5 days of future forecasting"
      - "fl.plan⎛p≋$149߷l≋enterprise߷contact us"
    - "fl.testimonial⎛a≋Some Customer߷b≋Executive Assistant߷c≋photo of an average executive assistant, working on a computer, bokeh߷q≋For me time is money, and TimeWatch changed my life."
    - "ui.slider⎛h≋700px":
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
      - "fb.ball⎛s≋⎝$a * 0.25⎞߷c≋⎝$mouse.clicked ? $b : '#ff0000'⎞"
      - "fb.ball⎛s≋⎝$a * 0.5⎞߷c≋⎝$mouse.clicked ? $b : '#00ff00'⎞"
      - "fb.ball⎛s≋⎝$a * 1.0⎞߷c≋⎝$mouse.clicked ? $b : '#0000ff'⎞"
    - "ui.p⎛Your final score is ⎝$score⎞"
    - "fl.footer⎛":
      - "fl.footer_copyright⎛b≋DuckBlog߷y≋2021"
      - "fl.footer_links⎛":
        - "fl.footer_link⎛h≋#߷About"
        - "fl.footer_link⎛h≋#߷Contact"`

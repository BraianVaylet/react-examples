# Principios SOLID en React.js (Buenas prácticas)

A medida que la industria del software crece y comete errores, las mejores prácticas y los buenos principios de diseño de software surgen y se conceptualizan para evitar repetir los mismos errores en el futuro. El mundo de la programación orientada a objetos (OOP) en particular es una mina de oro de tales mejores prácticas, y SOLID es, sin duda, uno de los más influyentes.

SOLID es un acrónimo, donde cada letra representa uno de los cinco principios de diseño que son:

## Los 5 principios son

- **S**: [SRP] Single responsibility principle o Principio de responsabilidad única
- **O**: [OCP] Open/closed principle o Principio de abierto/cerrado
- **L**: [LSP] Liskov substitution principle o Principio de sustitución de Liskov
- **I**: [ISP] Interface segregation principle o Principio de segregación de la interfaz
- **D**: [DIP] Dependency inversion principle o Principio de inversión de dependencia

En este artículo, hablaremos sobre la importancia de cada principio y veremos cómo podemos aplicar los aprendizajes de SOLID en aplicaciones React.

Sin embargo, antes de comenzar, hay una gran advertencia . Los principios de SOLID se concibieron y delinearon teniendo en cuenta el lenguaje de programación orientado a objetos. Estos principios y su explicación se basan en gran medida en conceptos de clases e interfaces, mientras que JS en realidad no tiene ninguno de los dos. Lo que a menudo consideramos como "clases" en JS son simplemente clases similares simuladas usando su sistema prototipo, y las interfaces no son parte del lenguaje en absoluto (aunque la adición de TypeScript ayuda un poco). Aún más, la forma en que escribimos el código React moderno está lejos de estar orientado a objetos; en todo caso, se siente más funcional.

Sin embargo, la buena noticia es que los principios de diseño de software como SOLID son independientes del lenguaje y tienen un alto nivel de abstracción, lo que significa que si entrecerramos los ojos lo suficiente y nos tomamos algunas libertades con la interpretación, podremos aplicarlos a nuestro código React más funcional. .

Así que tomémonos algunas libertades.

## Conclusión

A pesar de haber nacido de los problemas del mundo OOP, los principios SOLID tienen su aplicación mucho más allá. En este artículo, hemos visto cómo al tener cierta flexibilidad con las interpretaciones de estos principios, logramos aplicarlos a nuestro código React y hacerlo más fácil de mantener y robusto.

Sin embargo, es importante recordar que ser dogmático y seguir religiosamente estos principios puede ser perjudicial y conducir a un código sobre diseñado, por lo que debemos aprender a reconocer cuándo una mayor descomposición o desacoplamiento de componentes introduce complejidad con poco o ningún beneficio.

### ref

https://konstantinlebedev.com/solid-in-react/

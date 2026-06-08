# Core Java — Complete Courseware

> **Original Author:** Vaman Deshmukh
> **Revised & Modernized:** 2024–25
> **Baseline:** Java 8 (LTS) · Modern features covered separately through Java 24

---

## About This Courseware

This courseware is written for developers who are new to Java or are refreshing their fundamentals before moving into frameworks like Spring Boot. It assumes no prior Java knowledge but does assume basic programming awareness (variables, loops, functions from any language).

**Design principles of this material:**

- Java 8 is the baseline. Every feature taught here is available in Java 8+.
- Code examples use an **Employee / Department / Project** domain consistently across all modules — no toy `foo/bar` examples.
- Names used in examples: **Sonu, Monu, Tonu, Ponu, Gonu** — so you actually remember them.
- Modern Java features (Java 11, 13/14, 17, 21, 24) are covered in dedicated standalone files at the end — clearly separated, not mixed in.
- GUI (AWT/Swing) is not covered. Participants are expected to progress to Spring Boot REST APIs, not desktop applications.
- Each file is self-contained for a single topic so you can jump to what you need.

---

## Prerequisites

- Basic understanding of what a program is (any language is fine)
- JDK 8 or higher installed (JDK 17 or 21 LTS recommended for setup)
- An IDE: IntelliJ IDEA Community Edition (recommended) or Eclipse
- No prior Java knowledge needed

---

## Courseware Structure

The material is organized into **thematic modules**. Each module is one `.md` file covering one major topic. Work through them top to bottom for the first time.

---

### Part A — Foundations

| # | File | Topic |
|---|------|-------|
| 01 | `01_Introduction_and_Setup.md` | What is Java, JDK/JRE/JVM, WORA, Installing JDK, First Program, How Java code runs |
| 02 | `02_Datatypes_Variables_Operators.md` | Primitive types, Literals, Variables, Type casting & promotion, Wrapper classes, Autoboxing, Operators & assignments |
| 03 | `03_Flow_Control.md` | if/else, switch (classic + arrow), while, do-while, for, for-each, break, continue, labeled statements |
| 04 | `04_Arrays.md` | 1D arrays, 2D arrays, java.util.Arrays, for-each with arrays, common pitfalls |

---

### Part B — Object-Oriented Programming

| # | File | Topic |
|---|------|-------|
| 05 | `05_Classes_Objects_and_Members.md` | Classes, Objects, Fields, Methods, Static vs Non-static members, execution flow, blocks, constructors, `this` |
| 06 | `06_Access_Modifiers_and_Packages.md` | private, default, protected, public — with rules; Packages, import, FQN, subpackages |
| 07 | `07_Inheritance.md` | extends, super, constructor chaining, method overriding, @Override, final, types of inheritance |
| 08 | `08_Polymorphism.md` | Compile-time (overloading) vs Runtime (dynamic dispatch), instanceof, upcasting, downcasting |
| 09 | `09_Abstraction.md` | abstract classes, interfaces, default/static methods in interfaces (Java 8), abstract class vs interface |
| 10 | `10_Encapsulation.md` | Data hiding with private fields, getters/setters, immutable classes, JavaBeans convention |

---

### Part C — Core Java Topics

| # | File | Topic |
|---|------|-------|
| 11 | `11_String_Handling.md` | String immutability, String pool, String methods, StringBuilder, StringBuffer, String vs StringBuilder vs StringBuffer, common patterns |
| 12 | `12_Object_Class_Methods.md` | toString(), equals(), hashCode(), clone(), wait()/notify()/notifyAll(), finalize() (deprecated note) |
| 13 | `13_Exception_Handling.md` | Exception hierarchy, checked vs unchecked, try-catch-finally, multi-catch, try-with-resources, throw/throws, custom exceptions, assertions |
| 14 | `14_Inner_Classes.md` | Regular inner class, static nested class, method-local inner class, anonymous inner class, comparison with lambdas |
| 15 | `15_Enums.md` | Basic enums, enum with fields and methods, enum in switch, EnumSet, EnumMap, best practices |

---

### Part D — Java 8 Features

| # | File | Topic |
|---|------|-------|
| 16 | `16_Lambda_Expressions.md` | Anonymous functions, lambda syntax, evolution from anonymous class, method references (4 types) |
| 17 | `17_Functional_Interfaces.md` | @FunctionalInterface, Runnable, Supplier, Consumer, Function, Predicate, BiFunction, composition |
| 18 | `18_Stream_API.md` | Stream pipeline, creation, intermediate ops (filter, map, flatMap, sorted, distinct, limit, skip), terminal ops (collect, count, reduce, findFirst, anyMatch, forEach), Collectors, parallel streams |
| 19 | `19_Optional.md` | The null problem, Optional creation, isPresent/ifPresent, map/flatMap/filter, orElse/orElseGet/orElseThrow |

---

### Part E — Concurrency

| # | File | Topic |
|---|------|-------|
| 20 | `20_Multithreading.md` | Thread vs Runnable, thread lifecycle, sleep/join/interrupt, thread priorities, daemon threads, synchronization, race conditions, synchronized keyword |
| 21 | `21_Executor_Framework.md` | Why ExecutorService over raw Thread, Executors factory methods, submit vs execute, Callable, Future, ScheduledExecutorService, CompletableFuture basics, concurrent collections |

---

### Part F — I/O and Collections

| # | File | Topic |
|---|------|-------|
| 22 | `22_IO_Streams.md` | Byte streams, character streams, buffered streams, data streams, try-with-resources, java.nio.file (Path, Files), reading/writing files, serialization & transient |
| 23 | `23_Collections_and_Generics.md` | Collection hierarchy, List (ArrayList, LinkedList), Set (HashSet, LinkedHashSet, TreeSet), Queue/Deque, Map (HashMap, LinkedHashMap, TreeMap), Generics, Collections utility class, Java 9 factory methods |

---

### Part G — Advanced Topics

| # | File | Topic |
|---|------|-------|
| 24 | `24_Annotations.md` | What are annotations, built-in annotations (@Override, @Deprecated, @SuppressWarnings), meta-annotations (@Retention, @Target, @Documented, @Inherited), custom annotations, reading with Reflection |
| 25 | `25_JVM_Architecture.md` | Class loading, runtime data areas (method area, heap, stack, PC register, native stack), JIT compiler, Garbage Collection — types and algorithms, GC tuning basics |
| 26 | `26_Garbage_Collection_and_Object_Lifecycle.md` | Object creation to collection, strong/soft/weak/phantom references, GC eligibility, finalize() (deprecated), try-with-resources as the modern pattern, G1/ZGC/Shenandoah overview |

---

### Part H — Modern Java (Post Java 8)

| # | File | Topic |
|---|------|-------|
| 27 | `27_Java11_Features.md` | String methods (strip, isBlank, repeat, lines), Files.readString/writeString, var in lambdas, HttpClient API, running single-file programs |
| 28 | `28_Java13_14_Features.md` | Text blocks (Java 13 preview / 14 standard), switch expressions (arrow syntax, yield), helpful NullPointerException messages |
| 29 | `29_Java17_Features.md` | Sealed classes and interfaces, records, pattern matching instanceof, strong encapsulation of JDK internals |
| 30 | `30_Java21_Features.md` | Virtual threads (Project Loom), record patterns, pattern matching in switch, sequenced collections, structured concurrency (preview) |
| 31 | `31_Java24_Features.md` | Finalized features from Loom and Valhalla, primitive types in patterns, stable virtual threads, other notable changes |

---

### Part I — Interview Preparation

| # | File | Topic |
|---|------|-------|
| 32 | `32_Interview_Questions.md` | Curated questions by topic — Foundations, OOP, Collections, Java 8, Concurrency, JVM, String, Exceptions — with concise answers |

---

## Recommended Learning Path

```
Week 1    Modules 01–04     Foundations — syntax, types, control flow, arrays
Week 2    Modules 05–06     Classes, objects, static/non-static, packages
Week 3    Modules 07–10     OOP pillars — inheritance, polymorphism, abstraction, encapsulation
Week 4    Modules 11–15     Strings, Object class, exceptions, inner classes, enums
Week 5    Modules 16–19     Java 8 — lambdas, functional interfaces, streams, Optional
Week 6    Modules 20–21     Concurrency — threads and executor framework
Week 7    Modules 22–23     I/O and collections
Week 8    Modules 24–26     Annotations, JVM, garbage collection
Week 9    Modules 27–31     Modern Java (11 through 24) — read as a series
Week 10   Module 32         Interview preparation and revision
```

> You do not need to finish all modern Java modules before moving to Spring Boot.
> Weeks 1–8 (Modules 01–23) are sufficient for a Spring Boot beginner course.
> Modules 24–31 can be done in parallel or after.

---

## Coding Style Used in This Courseware

All code examples follow these conventions:

```
Domain:      Employee Management — Employee, Department, Project, Job
Names:       Sonu, Monu, Tonu, Ponu, Gonu
Packages:    com.ems.bean, com.ems.service, com.ems.util
Constants:   MAX_SALARY, DEFAULT_DEPT
Java style:  Standard Oracle conventions (camelCase methods, PascalCase classes, UPPER_SNAKE constants)
```

Example of what to expect:

```java
package com.ems.bean;

public class Employee {
    private int id;
    private String name;
    private double salary;
    private String department;

    public Employee(int id, String name, double salary, String department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    // getters, setters, toString ...
}

// Usage — in main or a service class
Employee e1 = new Employee(101, "Sonu",  75000, "Engineering");
Employee e2 = new Employee(102, "Monu",  82000, "Engineering");
Employee e3 = new Employee(103, "Tonu",  55000, "HR");
Employee e4 = new Employee(104, "Ponu",  91000, "Finance");
Employee e5 = new Employee(105, "Gonu",  68000, "Operations");
```

---

## Java Version Reference

| Version | Year | LTS? | Key Additions Covered in This Courseware |
|---------|------|------|------------------------------------------|
| Java 8  | 2014 | —    | Lambda, Stream API, Optional, default methods, Functional interfaces |
| Java 11 | 2018 | ✓    | HttpClient, String methods, var in lambdas, single-file execution |
| Java 13 | 2019 | —    | Text blocks (preview) |
| Java 14 | 2020 | —    | Switch expressions (standard), Text blocks (standard), helpful NPE |
| Java 17 | 2021 | ✓    | Sealed classes, Records, Pattern matching instanceof |
| Java 21 | 2023 | ✓    | Virtual threads, Record patterns, Sequenced collections |
| Java 24 | 2024 | —    | Finalized Loom features, primitive patterns, stable structured concurrency |

> **For new projects:** Use Java 21 (LTS) or Java 17 (LTS).
> **For existing enterprise code:** Java 8 or Java 11 are still very common.
> **This courseware:** Java 8 baseline so everything compiles on any modern JDK.

---

## Tools and Setup

| Tool | Purpose | Where to get |
|------|---------|--------------|
| JDK 17 or 21 | Java compiler and runtime | https://adoptium.net |
| IntelliJ IDEA Community | IDE (recommended) | https://www.jetbrains.com/idea/download |
| Eclipse IDE for Java | Alternative IDE | https://www.eclipse.org/downloads |
| Maven (bundled in IDE) | Build tool — needed later for Spring Boot | — |

> Setup instructions with screenshots are in `01_Introduction_and_Setup.md`.

---

## Key References

- [Oracle Java 8 API Documentation](https://docs.oracle.com/javase/8/docs/api/)
- [Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/)
- [Baeldung Java Guides](https://www.baeldung.com) — practical examples
- *Java: The Complete Reference* — Herbert Schildt
- *Effective Java* — Joshua Bloch (read after completing this courseware)

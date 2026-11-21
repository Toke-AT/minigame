```mermaid
classDiagram
    Ball <|-- MovingBall
    MovingBall <|-- ShootingBall
    Ball <|-- Deer
    Ball <|-- JumpingBall
    Ball <|-- SpringBall
    Ball <|-- Bullet
    ShootingBall "1" --> "*" Bullet : bullets

    class Ball {
        +position
        +velocity
        +diam
        +img
        +col
        +bounds
        +mass
        +fixed
        +constructor(x, y, r, img, col, xSpeed, ySpeed, bounds)
        +update()
        +show()
        +constrain()
        +hit(anotherBall)
        +bounce(other)
    }

    class MovingBall {
        +speed
        +heading
        +left()
        +right()
        +up()
        +down()
        +forward()
        +back()
    }

    class ShootingBall {
        +bulletSpeed
        -bullets
        +shoot()
    }

    class Bullet {
        +isGone()
    }

    class Deer {
        +Step(dx, dy)
    }

    class JumpingBall {
        +jumpForce
        +jump()
    }

    class SpringBall {
        +start
        +maxDragDist
        +isFlying
        +isDragging
        +hasHit
        +drag()
        +launch()
        +reset()
    }

    <!--
    class Hit {
        +wasHit
    }

    class Firebase {
        +ref
        +save(name, points)
        +listen(onUpdate, limit, sort, dir)
        +remove(id)
        +clear()
    }
    -->
```

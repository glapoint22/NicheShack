export class Vector {
    constructor(public x: number, public y: number) { }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector {
        let magnitude = this.magnitude();

        if (magnitude > 0) {
            return new Vector(this.x / magnitude, this.y / magnitude);
        }

        return new Vector(0, 0);
    }

    clamp() {
        if (Math.abs(this.x) + Math.abs(this.y) > 1) {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);

            let diff = (this.x + this.y) - 1;
            this.x -= (diff / 2);
            this.y -= (diff / 2);
        }
    }

    multiply(v: Vector) {
        this.x *= Math.abs(v.x);
        this.y *= Math.abs(v.y);
    }
}
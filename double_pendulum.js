class DoublePendulum{
	constructor(m, len, g, theta, speed){
		this.m1 = m
		this.m2 = m
		this.len1 = len
		this.len2 = len
		this.g = g
		this.theta1 = theta
		this.theta2 = theta
		this.av1 = speed
		this.av2 = speed
		// the end of the pendulum that stays still (the pivot)
		this.xpivot = 200 
		this.ypivot = 200
		// the end of the pendulum with the weight
		this.x1 = this.xpivot + this.len1 * Math.sin(this.theta1)
		this.y1 = this.ypivot + this.len1 * Math.cos(this.theta1)

		this.x2 = this.x1 + this.len2 * Math.sin(this.theta2)
		this.y2 = this.y1 + this.len2 * Math.cos(this.theta2)

		this.speed1 = 0
		this.speed2 = 0
	}
	show(){
		fill(0)
		strokeWeight(2)
		line(this.xpivot, this.ypivot, this.x1, this.y1)
		line(this.x1, this.y1, this.x2, this.y2)
		circle(this.x1, this.y1, 10)
		circle(this.x2, this.y2, 10)
	}

	swing(){
		this.theta1 += this.av1 //* 0.9
		this.theta2 += this.av2 //* 0.9

		let oldx1 = this.x1
		let oldy1 = this.y1
		let oldy2 = this.y2
		let oldx2 = this.x2

		this.x1 = this.xpivot + this.len1 * Math.sin(this.theta1)
		this.y1 = this.ypivot + this.len1 * Math.cos(this.theta1)

		this.x2 = this.x1 + this.len2 * Math.sin(this.theta2)
		this.y2 = this.y1 + this.len2 * Math.cos(this.theta2)

		this.speed1 = dist(oldx1, oldy1, this.x1, this.y1)
		this.speed2 = dist(oldx2, oldy2, this.x2, this.y2)
	}

	accelerate(){


		// numerators
		let n1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.theta1);
		let n2 = -this.m2 * this.g * Math.sin(this.theta1 - 2 * this.theta2);
		let n3 = -2 * Math.sin(this.theta1 - this.theta2) * this.m2 ;
		let n4 = (this.av2 ** 2) * this.len2 + (this.av1 * this.av1) * this.len1 * Math.cos(this.theta1 - this.theta2);

		// denominator
		let d1 = this.len1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2))
		

		let n5 = 2 * sin(this.theta1 - this.theta2)
		let n6 = (this.av1 ** 2) * this.len1 * (this.m1 + this.m2)
		let n7 = this.g * (this.m1 + this.m2) * Math.cos(this.theta1)
		let n8 = (this.av2**2) * this.len2 * this.m2 * Math.cos(this.theta1 - this.theta2)

		let d2 = this.len2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2))
		

		this.av1 += (n1+n2+(n3*n4))/d1

		this.av2 += (n5*(n6+n7+n8))/d2

		// this.av1 += 0
		// this.av2 += 0

		// console.log(a)
		// console.log(b)
		// console.log('------------------------------------------------------')
		// console.log(c)
		// console.log(d)

	}

	calculate_energy(){
		let gpe1 = (height-this.y1)*this.g
		let gpe2 = (height-this.y2)*this.g
		let ke1 = 0.5*(this.speed1**2)
		let ke2 = 0.5*(this.speed2**2)
		return(gpe2+gpe1+ke1+ke2)

	}


}
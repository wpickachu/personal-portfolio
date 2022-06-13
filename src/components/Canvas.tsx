import React, { useEffect, useMemo, useRef, useContext } from 'react';

import { useMousePosition } from '../lib/useMousePosition';
import { Rectangle, Vector2D } from '../lib/2d';
import { GlobalContext } from './AppContext';
import { colorByMode } from './Color';

interface BackgroundCanvasProps {
	offsetSpeed: number;
	stepSize: number;
	pointCount: number;
	canvasSize: Vector2D;
}
class Point {
	public active = false;

	public speed: number = Math.random() * 5;

	public range: number = Math.random() * 2;

	public xDir: number = Math.random() > 0.5 ? 1 : -1;

	public yDir: number = Math.random() > 0.5 ? 1 : -1;

	public diameter: number = Math.random() * 10;

	public position: Vector2D;

	public constructor(newPosition: Vector2D) {
		this.position = newPosition;
	}

	distance(newPoint: Vector2D): number {
		return this.position.distance(newPoint);
	}
}

export const BackgroundCanvas: React.VFC<BackgroundCanvasProps> = function (props) {
	const { offsetSpeed, stepSize, canvasSize } = props;
	const { type, mode } = useContext(GlobalContext);

	const mouse = useMousePosition();

	const canvasElementRef = useRef<HTMLCanvasElement>(null);
	const context = canvasElementRef.current?.getContext('2d') || null;

	const animationFrameHandle = useRef<number>(0);
	const lastFrameTime = useRef<number>(0);

	const points = useRef<Point[]>([]);

	const offset = useRef<number>(0);
	const offsetMouse = useRef<Vector2D>(new Vector2D());
	const viewport = useRef<Rectangle>(new Rectangle());

	const scaledCanvasSize = useMemo(() => canvasSize.scale(2, 2, true), [canvasSize]);

	useEffect(() => {
		points.current = [];
		if (type) {
			for (let i = 0; i < props.pointCount; i++) {
				points.current.push(
					new Point(new Vector2D(Math.random() * scaledCanvasSize.x, Math.random() * scaledCanvasSize.y)),
				);
			}
		} else {
			for (let x = -stepSize; x <= scaledCanvasSize.x + stepSize * 2; x += stepSize) {
				for (let y = -stepSize; y <= scaledCanvasSize.y + stepSize * 2; y += stepSize) {
					points.current.push(new Point(new Vector2D(x, y)));
				}
			}
		}
	}, [scaledCanvasSize, stepSize, type]);

	useEffect(() => {
		if (!canvasElementRef) return () => {};

		function draw(ctx: CanvasRenderingContext2D, delta: number) {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			offsetMouse.current.set(mouse.current.x * 2, mouse.current.y * 2 - offset.current);
			viewport.current.position.set(0, -offset.current);
			viewport.current.size.set(scaledCanvasSize.x, scaledCanvasSize.y);

			ctx.fillStyle = '#ffffff';
			ctx.strokeStyle = '#cc2233';

			// ctx.font = "20px monospace";
			// ctx.textBaseline = "top";

			// ctx.fillText("Mouse position:", 8, 8);
			// ctx.fillText(`  Actual:  ${mouse.current.toString()}`, 8, (8 + (16 * 1) + (2 * 1)));
			// ctx.fillText(`  Virtual: ${offsetMouse.current.toString()}`, 8, (8 + (16 * 2) + (2 * 2)));

			// ctx.fillText("Viewport:", 8, (8 + (16 * 4) + (2 * 4)));
			// ctx.fillText(`  Size:    ${canvasSize.toString()}`, 8, (8 + (16 * 5) + (2 * 5)));
			// ctx.fillText(`  Camera:  ${viewport.current.toString()}`, 8, (8 + (16 * 6) + (2 * 6)));

			// ctx.fillText("World:", 8, (8 + (16 * 8) + (2 * 8)));
			// ctx.fillText(`  Offset:  ${offset.current.toString()}`, 8, (8 + (16 * 9) + (2 * 9)));
			// ctx.fillText(`  Size:    ${canvasSize.toString()}`, 8, (8 + (16 * 10) + (2 * 10)));

			ctx.translate(0, offset.current);

			/* ctx.strokeRect(
				viewport.current.position.x,
				viewport.current.position.y,
				viewport.current.size.x,
				viewport.current.size.y
			); */

			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.arc(offsetMouse.current.x, offsetMouse.current.y, 5, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();

			// const nearestMousePosition: Vector2D = new Vector2D();
			for (let i = 0; i < points.current.length; i += 1) {
				const point = points.current[i];
				const pointMouseDistance = offsetMouse.current.distance(point.position);

				if (pointMouseDistance <= stepSize * 2 * point.range) {
					point.active = true;

					// Draw Line from points to mouse cursor
					ctx.beginPath();
					ctx.moveTo(point.position.x, point.position.y);
					ctx.lineTo(offsetMouse.current.x, offsetMouse.current.y);
					ctx.closePath();
					ctx.strokeStyle = 'rgba(98, 150, 240, 0.8)';
					ctx.stroke();
				} else {
					point.active = false;
				}

				if (type) {
					for (let j = 0; j != i && j < points.current.length; j += 1) {
						const otherPoint = points.current[j];

						const twoPointsDistance = point.distance(otherPoint.position);
						if (twoPointsDistance < stepSize) {
							ctx.beginPath();
							ctx.moveTo(point.position.x, point.position.y);
							ctx.lineTo(otherPoint.position.x, otherPoint.position.y);
							ctx.closePath();
							ctx.strokeStyle = 'rgba(98, 150, 240, 0.8)';
							ctx.stroke();
						}
					}
					const newX = point.position.x + point.speed * point.xDir;
					const newY = point.position.y + point.speed * point.yDir;
					if (newX > scaledCanvasSize.x || newX < 0) {
						point.xDir *= -1;
					} else {
						point.position.x = newX;
					}
					if (newY > scaledCanvasSize.y || newY < 0) {
						point.yDir *= -1;
					} else {
						point.position.y = newY;
					}
				} else {
					// Draw Checker lines
					ctx.beginPath();
					ctx.moveTo(point.position.x, point.position.y);
					ctx.lineTo(point.position.x + stepSize * 2, point.position.y);
					ctx.moveTo(point.position.x + stepSize, point.position.y);
					ctx.lineTo(point.position.x + stepSize, point.position.y + stepSize * 2);
					ctx.closePath();
					ctx.strokeStyle = 'rgba(100, 140, 230, 0.2)';
					ctx.lineWidth = 0.5;
					ctx.stroke();
				}

				// Draw Dots
				ctx.beginPath();
				if (type) {
					ctx.fillStyle = point.active ? 'rgba(98, 150, 240, 0.6)' : 'rgba(98, 150, 240, 0.85)';
					ctx.arc(point.position.x, point.position.y, point.diameter, 0, 2 * Math.PI);
				} else {
					ctx.fillStyle = point.active ? 'rgba(98, 150, 240, 0.6)' : 'rgba(125, 125, 125, 0.75)';
					ctx.arc(point.position.x, point.position.y, point.active ? 3.5 : 2, 0, 2 * Math.PI);
				}
				ctx.closePath();
				ctx.fill();
			}

			/* mouseHistory.current = [...mouseHistory.current, {
				position: nearestMousePosition.clone(),
				ts: Date.now()
			}].filter((entry) => {
				return (Date.now() - entry.ts) <= 410;
			});

			if (mouseHistory.current.length >= 50) {
				ctx.beginPath();
                ctx.moveTo(mouseHistory.current[0].position.x, mouseHistory.current[0].position.y);
				for (let i = 0; i < mouseHistory.current.length; i += 1) {
					const mouseHistoryEntry = mouseHistory.current[i];
					ctx.lineTo(mouseHistoryEntry.position.x, mouseHistoryEntry.position.y);
				}

				ctx.closePath();
				ctx.strokeStyle = "white";
				ctx.stroke();
			} */
			if (!type) {
				offset.current = (offset.current - 1 * offsetSpeed) % stepSize;
			}
			// offset.current -= (1 * (offsetSpeed / delta));
		}

		function animate(elapsedTime: number): void {
			const delta = elapsedTime - (lastFrameTime.current || 0);
			animationFrameHandle.current = requestAnimationFrame(animate);
			if (!context) return;

			/*
                if we *don't* already have a first frame, and the delta is less
                than 33ms (30fps in this case) then don't do anything and return.

                @see https://remysharp.com/2015/07/13/optimising-a-canvas-animation#pinning-fps
            */
			if (lastFrameTime.current && delta < 33) return;

			lastFrameTime.current = elapsedTime;
			draw(context, delta);
		}

		animationFrameHandle.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameHandle.current);
	}, [context, mouse, stepSize, offsetSpeed, scaledCanvasSize, type]);

	return (
		<canvas
			ref={canvasElementRef}
			className={`h-full w-full ${colorByMode.background[mode]}`}
			width={scaledCanvasSize.x}
			height={scaledCanvasSize.y}
		/>
	);
};

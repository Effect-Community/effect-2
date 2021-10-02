import type { $Cause } from "../Cause/type.js"

/**
  private[zio] final class FlatMap[R, E, A0, A](val zio: ZIO[R, E, A0], val k: A0 => ZIO[R, E, A])
      extends ZIO[R, E, A] {
    override def tag = Tags.FlatMap
  }

  private[zio] final class SucceedNow[A](val value: A) extends UIO[A] {
    override def tag = Tags.SucceedNow
  }

  private[zio] final class Succeed[A](val effect: () => A) extends UIO[A] {
    override def tag = Tags.Succeed
  }

  private[zio] final class SucceedWith[A](val effect: (RuntimeConfig, FiberId) => A) extends UIO[A] {
    override def tag = Tags.SucceedWith
  }

  private[zio] final class Suspend[R, E, A](val make: () => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.Suspend
  }

  private[zio] final class SuspendWith[R, E, A](val make: (RuntimeConfig, FiberId) => ZIO[R, E, A])
      extends ZIO[R, E, A] {
    override def tag = Tags.SuspendWith
  }

  private[zio] final class Async[R, E, A](
    val register: (ZIO[R, E, A] => Unit) => Either[Canceler[R], ZIO[R, E, A]],
    val blockingOn: () => FiberId
  ) extends ZIO[R, E, A] {
    override def tag = Tags.Async
  }

  private[zio] final class Fold[R, E, E2, A, B](
    val value: ZIO[R, E, A],
    val failure: Cause[E] => ZIO[R, E2, B],
    val success: A => ZIO[R, E2, B]
  ) extends ZIOFn1[A, ZIO[R, E2, B]]
      with ZIO[R, E2, B]
      with Function[A, ZIO[R, E2, B]] {

    override def tag = Tags.Fold

    override def underlying = success

    def apply(v: A): ZIO[R, E2, B] = success(v)
  }

  private[zio] final class Fork[R, E, A](
    val value: ZIO[R, E, A],
    val scope: () => Option[ZScope[Exit[Any, Any]]]
  ) extends URIO[R, Fiber.Runtime[E, A]] {
    override def tag = Tags.Fork
  }

  private[zio] final class InterruptStatus[R, E, A](val zio: ZIO[R, E, A], val flag: () => _root_.zio.InterruptStatus)
      extends ZIO[R, E, A] {
    override def tag = Tags.InterruptStatus
  }

  private[zio] final class CheckInterrupt[R, E, A](val k: zio.InterruptStatus => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.CheckInterrupt
  }

  private[zio] final class Fail[E](val fill: (() => ZTrace) => Cause[E]) extends IO[E, Nothing] { self =>
    override def tag = Tags.Fail

    override def map[B](f: Nothing => B): IO[E, Nothing] =
      self

    override def flatMap[R1 <: Any, E1 >: E, B](k: Nothing => ZIO[R1, E1, B]): ZIO[R1, E1, Nothing] =
      self
  }

  private[zio] final class Descriptor[R, E, A](val k: Fiber.Descriptor => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.Descriptor
  }

  private[zio] final class Shift(val executor: () => Executor) extends UIO[Unit] {
    override def tag = Tags.Shift
  }

  private[zio] object Yield extends UIO[Unit] {
    override def tag = Tags.Yield
  }

  private[zio] final class Read[R, E, A](val k: R => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.Access
  }

  private[zio] final class Provide[R, E, A](val r: () => R, val zio: ZIO[R, E, A]) extends IO[E, A] {
    override def tag = Tags.Provide
  }

  private[zio] final class FiberRefGetAll[R, E, A](val make: Map[ZFiberRef.Runtime[_], Any] => ZIO[R, E, A])
      extends ZIO[R, E, A] {
    override def tag = Tags.FiberRefGetAll
  }

  private[zio] final class FiberRefModify[A, B](val fiberRef: FiberRef.Runtime[A], val f: A => (B, A)) extends UIO[B] {
    override def tag = Tags.FiberRefModify
  }

  private[zio] final class FiberRefLocally[V, R, E, A](
    val localValue: V,
    val fiberRef: FiberRef.Runtime[V],
    val zio: ZIO[R, E, A]
  ) extends ZIO[R, E, A] {
    override def tag = Tags.FiberRefLocally
  }

  private[zio] final class FiberRefDelete(
    val fiberRef: FiberRef.Runtime[_]
  ) extends UIO[Unit] {
    override def tag = Tags.FiberRefDelete
  }

  private[zio] object Trace extends UIO[ZTrace] {
    override def tag = Tags.Trace
  }

  private[zio] final class TracingStatus[R, E, A](val zio: ZIO[R, E, A], val flag: () => TracingS)
      extends ZIO[R, E, A] {
    override def tag = Tags.TracingStatus
  }

  private[zio] final class CheckTracing[R, E, A](val k: TracingS => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.CheckTracing
  }

  private[zio] final class RaceWith[R, EL, ER, E, A, B, C](
    val left: () => ZIO[R, EL, A],
    val right: () => ZIO[R, ER, B],
    val leftWins: (Exit[EL, A], Fiber[ER, B]) => ZIO[R, E, C],
    val rightWins: (Exit[ER, B], Fiber[EL, A]) => ZIO[R, E, C],
    val scope: () => Option[ZScope[Exit[Any, Any]]]
  ) extends ZIO[R, E, C] {
    override def tag: Int = Tags.RaceWith
  }

  private[zio] final class Supervise[R, E, A](val zio: ZIO[R, E, A], val supervisor: () => Supervisor[Any])
      extends ZIO[R, E, A] {
    override def tag = Tags.Supervise
  }

  private[zio] final class GetForkScope[R, E, A](val f: ZScope[Exit[Any, Any]] => ZIO[R, E, A]) extends ZIO[R, E, A] {
    override def tag = Tags.GetForkScope
  }

  private[zio] final class OverrideForkScope[R, E, A](
    val zio: ZIO[R, E, A],
    val forkScope: () => Option[ZScope[Exit[Any, Any]]]
  ) extends ZIO[R, E, A] {
    override def tag = Tags.OverrideForkScope
  }

  private[zio] final class Ensuring[R, E, A](
    val zio: ZIO[R, E, A],
    val finalizer: () => ZIO[R, Nothing, Any]
  ) extends ZIO[R, E, A] {
    override def tag = Tags.Ensuring
  }

  private[zio] final class Logged(
    val message: () => String,
    val overrideLogLevel: Option[LogLevel] = None,
    val overrideRef1: FiberRef.Runtime[_] = null,
    val overrideValue1: AnyRef = null
  ) extends ZIO[Any, Nothing, Unit] {
    override def tag = Tags.Logged
  }

  private[zio] final class SetRuntimeConfig(val runtimeConfig: () => RuntimeConfig) extends UIO[Unit] {
    override def tag = Tags.SetRuntimeConfig
  }
 */

export class ISucceed {
  readonly _tag = "ISucceed"
  constructor(readonly effect: () => unknown, readonly trace: string | undefined) {}
}

export class IFail {
  readonly _tag = "IFail"
  constructor(
    readonly cause: () => $Cause<unknown>,
    readonly trace: string | undefined
  ) {}
}

export class IFlatMap {
  readonly _tag = "IFlatMap"
  constructor(
    readonly self: Instruction,
    readonly apply: (_: unknown) => Instruction,
    readonly trace: string | undefined
  ) {}
}

export class IEffectTotal {
  readonly _tag = "IEffectTotal"
  constructor(readonly effect: () => unknown, readonly trace: string | undefined) {}
}

type RuntimeConfig = {}
type FiberId = {}

export class IEffectWith {
  readonly _tag = "IEffectWith"
  constructor(
    readonly effect: (runtimeConfig: RuntimeConfig, fiberId: FiberId) => unknown,
    readonly trace: string | undefined
  ) {}
}

export class ISuspend {
  readonly _tag = "ISuspend"
  constructor(readonly make: () => Instruction, readonly trace: string | undefined) {}
}

export class ISuspendWith {
  readonly _tag = "ISuspendWith"
  constructor(
    readonly make: (runtimeConfig: RuntimeConfig, fiberId: FiberId) => Instruction,
    readonly trace: string | undefined
  ) {}
}

type Either<E, A> = {}
type Canceler = {}

export class IEffectAsync {
  readonly _tag = "IEffectAsync"
  constructor(
    readonly register: (
      done: (effect: Instruction) => void
    ) => Either<Canceler, Instruction>,
    readonly blockingOn: () => FiberId,
    readonly trace: string | undefined
  ) {}
}

export class IFold {
  readonly _tag = "IFold"
  constructor(
    readonly self: Instruction,
    readonly failure: (error: $Cause<unknown>) => Instruction,
    readonly apply: (result: unknown) => Instruction,
    readonly trace: string | undefined
  ) {}
}

export type Instruction =
  | ISucceed
  | IFlatMap
  | IEffectTotal
  | IEffectWith
  | ISuspend
  | IEffectAsync
  | IFold
  | IFail

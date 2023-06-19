//
//  Tapper.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import Foundation

struct Tapper {
    private let millisecondsInSecond: Int = 60_000
    private var tapTimes: [Double] = []

    /// Tap function captures the current time of tapping
    mutating func tap() {
        let currentTimeInMilliseconds = getCurrentTimeInMilliseconds()

        if shouldReset(currentTime: currentTimeInMilliseconds) {
            reset()
        }

        tapTimes.append(currentTimeInMilliseconds)
    }

    /// Resets the list of tap times
    mutating func reset() {
        tapTimes = []
    }

    /// Calculates BPM (Beats Per Minute) from the tap times
    var bpm: Double {
        guard tapTimes.count > 1 else {
            return 0
        }

        let beatCount = tapTimes.count - 1
        let durationInMilliseconds = calculateDurationInMilliseconds()
        let rawBpm = Double(millisecondsInSecond * beatCount) / durationInMilliseconds
        let roundedBpm = roundToTwoDecimalPlaces(value: rawBpm)

        return roundedBpm
    }

    /// Calculates interval between taps in seconds
    var interval: Double {
        guard tapTimes.count > 1 else {
            return 1_000_000
        }
        let beatCount = tapTimes.count - 1
        let durationInMilliseconds = calculateDurationInMilliseconds()
        return durationInMilliseconds / Double(beatCount) / 1000
    }

    // MARK: - Helper Functions

    private func getCurrentTimeInMilliseconds() -> Double {
        return NSDate().timeIntervalSince1970 * 1000
    }

    private func shouldReset(currentTime: Double) -> Bool {
        guard let previousTime = tapTimes.last else {
            return false
        }
        let intervalSinceLastTap = currentTime - previousTime
        return intervalSinceLastTap > 4000
    }

    private func calculateDurationInMilliseconds() -> Double {
        return tapTimes.last! - tapTimes.first!
    }

    private func roundToTwoDecimalPlaces(value: Double) -> Double {
        return (value * 100).rounded() / 100
    }
}

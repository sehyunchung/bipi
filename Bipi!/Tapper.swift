//
//  Tapper.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import Foundation

struct Tapper {
    private let oneSec: Int = 60000
    private var cue: [Double] = []

    mutating func tap() {
        let currentTime = NSDate().timeIntervalSince1970 * 1000
        let prevTime = cue.last ?? currentTime

        guard (currentTime - prevTime) < 1000 else {
            reset()
            cue.append(currentTime)
            return
        }

        cue.append(currentTime)
    }

    mutating func reset() {
        cue = []
    }

    var bpm: Double {
        guard cue.count > 1 else {
            return 0
        }

        let beats = cue.count - 1
        let duration = cue.last! - cue.first!
        let rawBpm = Double(oneSec * beats) / duration
        let twoDecimalBpm = (rawBpm * 100).rounded() / 100

        return twoDecimalBpm
    }
}

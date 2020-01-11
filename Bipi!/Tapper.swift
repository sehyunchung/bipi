//
//  Tapper.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import Foundation

struct Tapper {
    private let ONE_SEC: Int = 60000
    private var cue: [Double] = []

    mutating func tap() {
        let ms = NSDate().timeIntervalSince1970 * 1000
        cue.append(ms)
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
        let rawBpm = Double(ONE_SEC * beats) / duration
        let twoDecimalBpm = (rawBpm * 100).rounded() / 100

        return twoDecimalBpm
    }
}